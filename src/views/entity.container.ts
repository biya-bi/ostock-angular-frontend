import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { Entity } from '../dtos/entity';
import { EntityLinks } from '../dtos/entity-links';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
import { EntityEvent } from '../events/entity.event';
import { SearchEvent } from '../events/search.event';
import { SortEvent } from '../events/sort.event';
import { Operation } from '../models/operation';
import { EntityService } from '../services/entity.service';
import { SearchService } from '../services/search.service';
import { SortingService } from '../services/sorting.service';
import { PageUtil } from '../util/PageUtil';
import { BaseComponent } from './base.component';
import { EntityListViewComponent } from './entity-list-view.component';
import { EntityViewComponent } from './entity-view.component';
import { ViewComponent } from './view.component';

export abstract class EntityContainer<T extends EntityContext<Entity<EntityLinks>, SearchCriteria>, U extends SearchEvent<SearchCriteria>> extends BaseComponent {
    private readonly busySubject = new Subject<boolean>();
    private readonly searchEventSubject = new Subject<U>();

    private readonly page$: Observable<Page<ListWrapper>> = this.searchEventSubject.pipe(switchMap(e => this.run(this.entityService.read(e))));

    readonly busy$ = this.busySubject.asObservable();
    readonly entityContext: WritableSignal<T> = this.getEntityContextSignal();

    constructor(
        protected readonly router: Router,
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly searchService: SearchService,
        protected readonly sortingService: SortingService,
        protected readonly entityService: EntityService<Entity<EntityLinks>, SearchCriteria>) {
        super();
    }

    onActivate(component: ViewComponent) {
        this.subscribeToEvents(component);
        if (component instanceof EntityListViewComponent) {
            this.searchEventSubject.next(this.getSearchEvent());
        } else if (component instanceof EntityViewComponent) {
            this.readEntity();
        }
    }

    protected abstract retrieveEntities(page: Page<ListWrapper>): Entity<EntityLinks>[];
    protected abstract getEntityListPath(): string;

    protected subscribeToEntityListViewEvents(component: EntityListViewComponent<Entity<EntityLinks>, T, U>) {
        this.page$.pipe(takeUntil(component.destroy$), tap(page => this.onPage(page, component))).subscribe();
        component.manage.pipe(takeUntil(component.destroy$), switchMap(event => this.writeEntity(event)), tap(() => this.search())).subscribe();
        component.search.pipe(takeUntil(component.destroy$), debounceTime(1000), tap(event => this.searchEventSubject.next(event))).subscribe();
        component.pageChange.pipe(takeUntil(component.destroy$), debounceTime(1000), tap(pageNumber => this.onPageChange(pageNumber))).subscribe();
        component.sort.pipe(takeUntil(component.destroy$), tap(event => this.onSort(component, event))).subscribe();
        component.select.pipe(takeUntil(component.destroy$), tap((entity) => this.onSelect(entity))).subscribe();
    }

    protected subscribeToEntityViewEvents(component: EntityViewComponent<Entity<EntityLinks>, T>) {
        component.manage.pipe(takeUntil(component.destroy$), switchMap(event => this.writeEntity(event))).subscribe();
    }

    protected getOperationParamName() {
        return 'operation';
    }

    protected getEntityUriParamName() {
        return 'uri';
    }

    protected run<T>(obs$: Observable<T>): Observable<T> {
        this.busySubject.next(true);
        return obs$.pipe(finalize(() => this.busySubject.next(false)));
    }

    private readEntity(): void {
        const queryParams = this.activatedRoute.snapshot.queryParams;
        const obs$ = this.entityService.readByUrl(queryParams[this.getEntityUriParamName()]);

        this.run(obs$).pipe(
            take(1),
            switchMap(entity => {
                return entity ? this.onReadEntity(entity) : of(entity);
            }),
            tap(entity => this.updateContext({ selectedEntity: entity, operation: this.getOperation() } as Partial<T>)))
            .subscribe();
    }

    private writeEntity(event: EntityEvent<Entity<EntityLinks>>): Observable<void> {
        let obs$: Observable<any>;
        const operation = event.operation || this.getOperation();
        switch (operation) {
            case Operation.Create:
                obs$ = this.entityService.create(event.entity);
                break;
            case Operation.Update:
                obs$ = this.entityService.update(event.entity);
                break;
            case Operation.Delete:
                obs$ = this.entityService.delete(event.entity._links.delete.href);
                break;
        }
        return this.run(obs$).pipe(take(1),
            tap(() => {
                const closeElement = event.closeElement;
                if (closeElement) {
                    closeElement.click();
                    // If closeElement is defined, a dialog may have been closed. So, navigating back to the 
                    // list path won't trigger the activate event because we are on the same page. The onActivation 
                    // method won't therefore be called. Consequently, the search event emitted in that method won't 
                    // be emitted. We therefore need to emit the search event after the write in this case.
                    this.searchEventSubject.next(this.getSearchEvent());
                }
                this.router.navigate([this.getEntityListPath()]);
            }));
    }

    private subscribeToEvents(component: ViewComponent) {
        if (component instanceof EntityListViewComponent || component instanceof EntityViewComponent) {
            this.busySubject.pipe(takeUntil(component.destroy$), tap(busy => component.busy = busy)).subscribe();
        }
        if (component instanceof EntityListViewComponent) {
            this.subscribeToEntityListViewEvents(component);
        } else if (component instanceof EntityViewComponent) {
            this.subscribeToEntityViewEvents(component);
        }
    }

    private onPage(page: Page<ListWrapper>, component: EntityListViewComponent<Entity<EntityLinks>, T, U>): void {
        const entities = this.sort(component, null, this.retrieveEntities(page));
        this.updateContext({ entities, pagination: PageUtil.getPagination(page) } as Partial<T>);
    }

    private onSort(component: EntityListViewComponent<Entity<EntityLinks>, T, U>, event: SortEvent): void {
        if (!event) {
            return;
        }

        const context = this.getContext();

        const entities = this.sort(component, event, context.entities);

        this.updateContext({ entities } as Partial<T>);
    }

    private sort(component: EntityListViewComponent<Entity<EntityLinks>, T, U>, event: SortEvent, entities: Entity<EntityLinks>[]): Entity<EntityLinks>[] {
        if (!event) {
            event = this.getSortEvent(component);
            if (!event) {
                return entities;
            }
        }

        const { attribute, direction } = event;

        if (!entities?.length) {
            entities = [];
        }

        return this.sortingService.sort(entities, attribute, direction);
    }

    private getSortEvent(component: EntityListViewComponent<Entity<EntityLinks>, T, U>): SortEvent {
        for (let i = 0; i < component.headers.length; i++) {
            const header = component.headers.get(i);
            if (header.direction !== '') {
                return { attribute: header.sortable, direction: header.direction };
            }
        }
        return null;
    }

    private search(): void {
        this.searchEventSubject.pipe(
            take(1),
            tap(searchEvent => {
                let event: U = searchEvent;
                if (!event) {
                    const context = this.getContext();
                    event = { searchCriteria: context.searchCriteria, pageRequest: context.pagination?.request } as U;
                }
                this.searchEventSubject.next({ ...event });
            })).subscribe();
    }

    protected getContext(): T {
        let context = this.entityContext();
        if (!context) {
            context = { entities: [], pagination: {}, operation: this.getOperation() } as T;
        }
        return context;
    }

    protected updateContext(context: Partial<T>): void {
        const currentContext = this.getContext();
        const newContext = { ...currentContext, ...context };
        this.entityContext.set(newContext);
    }

    private onPageChange(pageNumber: number): void {
        const context = this.getContext();
        let { request } = context.pagination;
        if (!request) {
            request = {};
        }
        request.pageNumber = pageNumber;
        const event = { searchCriteria: context.searchCriteria, pageRequest: request } as U;
        this.searchEventSubject.next(event);
    }

    private getSearchEvent(): U {
        const context = this.getContext();
        return { searchCriteria: context.searchCriteria, pageRequest: context.pagination?.request } as U;
    }

    private onSelect(entity: Entity<EntityLinks>): void {
        this.updateContext({ selectedEntity: entity } as Partial<T>);
    }

    protected getEntityContextSignal(): WritableSignal<T> {
        return signal({ entities: [], pagination: {}, searchCriteria: {} } as T);
    }

    protected onReadEntity(entity: Entity<EntityLinks>): Observable<Entity<EntityLinks>> {
        return of(entity);
    }

    protected isOperation(operation: Operation): boolean {
        return this.getOperation() === operation;
    }

    private getOperation(): Operation {
        return this.activatedRoute.snapshot.queryParams[this.getOperationParamName()];
    }
}