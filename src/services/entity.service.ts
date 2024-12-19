import { Observable } from 'rxjs';
import { SearchCriteria } from '../criteria/search-criteria';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { SearchService } from './search.service';

export abstract class EntityService<T extends SearchCriteria, U extends ListWrapper> {

    constructor(protected readonly searchService: SearchService) { }

    read(searchEvent: SearchEvent<T>): Observable<Page<U>> {
        const { searchCriteria, pageRequest } = searchEvent;

        const criteria = this.searchService.parseCriteria(searchCriteria);
        const request = this.searchService.parsePageRequest(pageRequest);

        return this.onRead({ searchCriteria: criteria, pageRequest: request });
    }

    protected abstract onRead(searchEvent: SearchEvent<T>): Observable<Page<U>>;
}