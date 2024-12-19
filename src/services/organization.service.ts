import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConnector } from '../connectors/api.connector';
import { OrganizationSearchCriteria } from '../criteria/organization-search-criteria';
import { OrganizationListWrapper } from '../dtos/organization-list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService extends EntityService<OrganizationSearchCriteria, OrganizationListWrapper> {

    constructor(protected override readonly searchService: SearchService, private readonly apiConnector: ApiConnector) {
        super(searchService);
    }

    protected override onRead(searchEvent: SearchEvent<OrganizationSearchCriteria>): Observable<Page<OrganizationListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;
        return this.apiConnector.readOrganizations(searchCriteria, pageRequest);
    }
}