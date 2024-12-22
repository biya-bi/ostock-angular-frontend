import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { Entity } from '../dtos/entity';
import { EntityLinks } from '../dtos/entity-links';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
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
import { EntityEvent } from '../events/entity.event';

export abstract class EntityContainer<T extends Entity<EntityLinks>, V extends SearchCriteria, W extends ListWrapper, X extends EntityContext<T, V>, Y extends SearchEvent<V>> extends BaseComponent {
    private readonly busySubject = new Subject<boolean>();
    private readonly searchEventSubject = new Subject<Y>();

    private readonly page$: Observable<Page<W>> = this.searchEventSubject.pipe(switchMap(e => this.run(this.entityService.read(e))));

    readonly busy$ = this.busySubject.asObservable();
    readonly entityContext: WritableSignal<X> = this.getEntityContextSignal();

    constructor(
        protected readonly router: Router,
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly searchService: SearchService,
        protected readonly sortingService: SortingService<T>,
        protected readonly entityService: EntityService<T, V, W>) {
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

    protected abstract retrieveEntities(page: Page<W>): T[];
    protected abstract getEntityListPath(): string;

    protected subscribeToEntityListViewEvents(component: EntityListViewComponent<T, V, X, Y>) {
        this.page$.pipe(takeUntil(component.destroy$), tap(page => this.onPage(page, component))).subscribe();
        component.manage.pipe(takeUntil(component.destroy$), switchMap(event => this.writeEntity(event)), tap(() => this.search())).subscribe();
        component.search.pipe(takeUntil(component.destroy$), debounceTime(1000), tap(event => this.searchEventSubject.next(event))).subscribe();
        component.pageChange.pipe(takeUntil(component.destroy$), debounceTime(1000), tap(pageNumber => this.onPageChange(pageNumber))).subscribe();
        component.sort.pipe(takeUntil(component.destroy$), tap(event => this.onSort(component, event))).subscribe();
        component.select.pipe(takeUntil(component.destroy$), tap((entity) => this.onSelect(entity))).subscribe();
    }

    protected subscribeToEntityViewEvents(component: EntityViewComponent<T, V, X>) {
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

        const obs$ = this.entityService.readByUri(queryParams[this.getEntityUriParamName()]);

        this.run(obs$).pipe(
            take(1),
            switchMap(entity => {
                return entity ? this.onReadEntity(entity) : of(entity);
            }),
            tap(entity => {
                const context = this.getContext();
                const operation = queryParams[this.getOperationParamName()];
                this.entityContext.set({ ...context, selectedEntity: entity, operation } as X);
            })).subscribe();
    }

    private writeEntity(event: EntityEvent<T>): Observable<void> {
        let obs$: Observable<any>;
        switch (event.operation) {
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

    private onPage(page: Page<W>, component: EntityListViewComponent<T, V, X, Y>): void {
        const entities = this.sort(component, null, this.retrieveEntities(page));
        const context = this.getContext();
        this.entityContext.set({ ...context, entities, pagination: PageUtil.getPagination(page) } as X);
    }

    private onSort(component: EntityListViewComponent<T, V, X, Y>, event: SortEvent): void {
        if (!event) {
            return;
        }

        const entities = this.sort(component, event, null);

        if (!entities?.length) {
            return;
        }

        const context = this.getContext();

        this.entityContext.set({ ...context, entities } as X);
    }

    private sort(component: EntityListViewComponent<T, V, X, Y>, event: SortEvent, entities: T[]): T[] {
        if (!event) {
            event = this.getSortEvent(component);
            if (!event) {
                return entities;
            }
        }

        const { attribute, direction } = event;

        component.headers.forEach(header => {
            if (header.sortable !== attribute) {
                header.direction = '';
            }
        });

        const context = this.getContext();

        entities = entities?.length ? entities : context.entities;
        if (!entities?.length) {
            entities = [];
        }

        return this.sortingService.sort(entities, attribute, direction);
    }

    private getSortEvent(component: EntityListViewComponent<T, V, X, Y>): SortEvent {
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
                let event: Y = searchEvent;
                if (!event) {
                    const context = this.getContext();
                    event = { searchCriteria: context.searchCriteria, pageRequest: context.pagination?.request } as Y;
                }
                this.searchEventSubject.next({ ...event });
            })).subscribe();
    }

    protected getContext(): X {
        let context = this.entityContext();
        if (!context) {
            context = { entities: [], pagination: {} } as X;
        }
        return context;
    }

    private onPageChange(pageNumber: number): void {
        const context = this.getContext();
        let { request } = context.pagination;
        if (!request) {
            request = {};
        }
        request.pageNumber = pageNumber;
        const event = { searchCriteria: context.searchCriteria, pageRequest: request } as Y;
        this.searchEventSubject.next(event);
    }

    private getSearchEvent(): Y {
        const context = this.getContext();
        return { searchCriteria: context.searchCriteria, pageRequest: context.pagination?.request } as Y;
    }

    private onSelect(entity: T): void {
        const context = this.getContext();
        this.entityContext.set({ ...context, selectedEntity: entity } as X);
    }

    protected getEntityContextSignal(): WritableSignal<X> {
        return signal({ entities: [], pagination: {}, searchCriteria: {} } as X);
    }

    protected onReadEntity(entity: T): Observable<T> {
        return of(entity);
    }

    protected isOperation(operation: Operation): boolean {
        return this.activatedRoute.snapshot.queryParams[this.getOperationParamName()] === operation;
    }
}