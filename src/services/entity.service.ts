import { Observable } from 'rxjs';
import { SearchCriteria } from '../criteria/search-criteria';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { SearchService } from './search.service';

export abstract class EntityService<T, U extends SearchCriteria> {

    constructor(protected readonly searchService: SearchService) { }

    read(searchEvent: SearchEvent<U>, uri?: string): Observable<Page<ListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;

        const criteria = this.searchService.parseCriteria(searchCriteria);
        const request = this.searchService.parsePageRequest(pageRequest);

        return this.onRead({ searchCriteria: criteria, pageRequest: request }, uri);
    }

    protected abstract onRead(searchEvent: SearchEvent<U>, uri?: string): Observable<Page<ListWrapper>>;

    abstract create(entity: T): Observable<T>;

    abstract update(entity: T): Observable<T>;

    abstract delete(uri: string): Observable<void>;

    abstract readByUrl(uri: string): Observable<T>;
}