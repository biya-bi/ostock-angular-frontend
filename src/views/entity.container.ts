import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { SearchCriteria } from '../criteria/search-criteria';
import { Entity } from '../dtos/entity';
import { EntityLinks } from '../dtos/entity-links';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
import { EntityEvent } from '../events/entity.event';
import { SortEvent } from '../events/sort.event';
import { Operation } from '../models/operation';
import { PageRange } from '../models/page-range';
import { PageRequest } from '../models/page-request';
import { Pagination } from '../models/pagination';
import { SearchService } from '../services/search.service';
import { SortingService } from '../services/sorting.service';
import { BaseComponent } from './base.component';
import { EntityListViewComponent } from './entity-list-view.component';
import { EntityViewComponent } from './entity-view.component';
import { ViewComponent } from './view.component';

export abstract class EntityContainer<S extends EntityLinks, T extends Entity<S>, U extends EntityEvent<T>, V extends SearchCriteria, W extends ListWrapper> extends BaseComponent {
    private readonly busySubject = new Subject<boolean>();

    constructor(
        protected readonly router: Router,
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly searchService: SearchService,
        protected readonly sortingService: SortingService<T>) {
        super();
    }

    onActivate(component: ViewComponent) {
        if (component instanceof EntityListViewComponent) {
            component.searchCriteria = {};
            component.pagination = { request: {} };
            this.readEntities(component);
            this.subscribeToEvents(component);
        } else if (component instanceof EntityViewComponent) {
            this.readEntity(component);
            this.subscribeToEvents(component);
        }
    }

    protected abstract createEntity(entity: T): Observable<T>;
    protected abstract updateEntity(entity: T): Observable<T>;
    protected abstract deleteEntity(uri: string): Observable<void>;
    protected abstract getEntity(uri: string): Observable<T>;
    protected abstract getEntities(searchCriteria: V, pageRequest: PageRequest): Observable<Page<W>>;
    protected abstract retrieveEntities(page: Page<W>): T[];
    protected abstract getEntityListPath(): string;

    protected subscribeToEntityListViewEvents(component: EntityListViewComponent<T, U, V>) {
        component.manage.pipe(takeUntil(this.destroy$), switchMap(event => this.writeEntity(event)), tap(() => this.readEntities(component))).subscribe();
        component.search.pipe(takeUntil(this.destroy$), debounceTime(1000), tap(_ => this.readEntities(component))).subscribe();
        component.pageChange.pipe(takeUntil(this.destroy$), debounceTime(1000), tap(_ => this.readEntities(component))).subscribe();
        component.sort.pipe(takeUntil(this.destroy$), tap(event => this.onSort(component, event))).subscribe();
    }

    protected subscribeToEntityViewEvents(component: EntityViewComponent<T, U>) {
        component.manage.pipe(takeUntil(this.destroy$), switchMap(event => this.writeEntity(event))).subscribe();
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

    private readEntities(component: EntityListViewComponent<T, U, V>): void {
        const searchCriteria = this.searchService.parseCriteria(component.searchCriteria);
        const pageRequest = this.searchService.parsePage(component.pagination);

        const obs$ = this.getEntities(searchCriteria, pageRequest);

        this.run(obs$).pipe(take(1), tap(page => this.onRead(component, page))).subscribe();
    }

    private readEntity(component: EntityViewComponent<T, U>): void {
        const queryParams = this.activatedRoute.snapshot.queryParams;

        const obs$ = this.getEntity(queryParams[this.getEntityUriParamName()]);

        this.run(obs$).pipe(
            take(1),
            tap(entity => {
                component.entity = entity;
                component.operation = queryParams[this.getOperationParamName()];
            })).subscribe();
    }

    private writeEntity(event: U): Observable<void> {
        let obs$: Observable<any>;
        switch (event.operation) {
            case Operation.Create:
                obs$ = this.createEntity(event.entity);
                break;
            case Operation.Update:
                obs$ = this.updateEntity(event.entity);
                break;
            case Operation.Delete:
                obs$ = this.deleteEntity(event.entity._links.delete.href);
                break;
        }
        return this.run(obs$).pipe(take(1),
            tap(() => {
                event.closeElement?.click();
                this.router.navigate([this.getEntityListPath()]);
            }));
    }

    private subscribeToEvents(component: ViewComponent) {
        if (component instanceof EntityListViewComponent || component instanceof EntityViewComponent) {
            this.busySubject.pipe(takeUntil(this.destroy$), tap(busy => component.busy = busy)).subscribe();
        }
        if (component instanceof EntityListViewComponent) {
            this.subscribeToEntityListViewEvents(component);
        } else if (component instanceof EntityViewComponent) {
            this.subscribeToEntityViewEvents(component);
        }
    }

    private onRead(component: EntityListViewComponent<T, U, V>, page: Page<W>): void {
        component.entities = this.retrieveEntities(page);
        component.pagination = this.getPagination(page);

        const sortEvent = this.getSortEvent(component);
        if (sortEvent) {
            this.onSort(component, sortEvent);
        }
    }

    private onSort(component: EntityListViewComponent<T, U, V>, event: SortEvent): void {
        if (!event) {
            return;
        }

        const { attribute, direction } = event;

        component.headers.forEach(header => {
            if (header.sortable !== attribute) {
                header.direction = '';
            }
        });
        component.entities = this.sortingService.sort(component.entities, attribute, direction);
    }

    private getSortEvent(component: EntityListViewComponent<T, U, V>): SortEvent {
        for (let i = 0; i < component.headers.length; i++) {
            const header = component.headers.get(i);
            if (header.direction !== '') {
                return { attribute: header.sortable, direction: header.direction };
            }
        }
        return null;
    }

    private getPagination(page: Page<W>): Pagination {
        return {
            request: {
                pageNumber: page.number + 1,
                pageSize: page.size
            },
            totalElements: page.totalElements,
            range: this.getPageRange(page)
        };
    }

    private getPageRange(page: Page<W>): PageRange {
        const { number, size, totalElements } = page;
        if (!totalElements) {
            return null;
        }
        const start = number * size + 1
        const end = Math.min(start + size - 1, totalElements);
        return { start, end };
    }
}