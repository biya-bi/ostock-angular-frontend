import { Observable, of } from 'rxjs';
import { CrudConnector } from '../connectors/crud.connector';
import { SearchCriteria } from '../criteria/search-criteria';
import { Entity } from '../dtos/entity';
import { EntityLinks } from '../dtos/entity-links';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { Serializer } from '../serialization/serializer';
import { SearchService } from './search.service';

export abstract class EntityService<T extends Entity<EntityLinks>, U extends SearchCriteria> {

    constructor(protected readonly searchService: SearchService, protected readonly connector: CrudConnector<T, U, ListWrapper>) { }

    read(searchEvent: SearchEvent<U>, url?: string): Observable<Page<ListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;

        const criteria = this.searchService.parseCriteria(searchCriteria);
        const request = this.searchService.parsePageRequest(pageRequest);

        return  this.connector.read(criteria, request, url);
    }

    create(entity: T): Observable<T> {
        const payload = this.serialize(entity);
        return this.connector.create(payload);
    }

    update(entity: T): Observable<T> {
        const url = entity._links.update.href;
        const payload = this.serialize(entity);
        return this.connector.update(payload, url);
    }

    delete(url: string): Observable<void> {
        return this.connector.delete(url);
    }

    readByUrl(url: string): Observable<T> {
        return url ? this.connector.readByUrl(url) : of(null);
    }

    protected getTransientFields(): string[] {
        return ['_links'];
    }

    protected serialize(entity: T): T {
        return Serializer.serialize(entity, this.getTransientFields());
    }
}