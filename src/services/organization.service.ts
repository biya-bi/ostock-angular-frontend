import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConnector } from '../connectors/api.connector';
import { OrganizationSearchCriteria } from '../criteria/organization-search-criteria';
import { OrganizationListWrapper } from '../dtos/organization-list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';
import { Organization } from '../dtos/organization';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService extends EntityService<Organization, OrganizationSearchCriteria, OrganizationListWrapper> {

    constructor(protected override readonly searchService: SearchService, private readonly apiConnector: ApiConnector) {
        super(searchService);
    }

    protected override onRead(searchEvent: SearchEvent<OrganizationSearchCriteria>): Observable<Page<OrganizationListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;
        return this.apiConnector.readOrganizations(searchCriteria, pageRequest);
    }

    override create(entity: Organization): Observable<Organization> {
        return this.apiConnector.createOrganization(entity);
    }

    override update(entity: Organization): Observable<Organization> {
        return this.apiConnector.updateOrganization(entity);
    }

    override delete(uri: string): Observable<void> {
        return this.apiConnector.delete(uri);
    }

    override readByUri(uri: string): Observable<Organization> {
        return this.apiConnector.readOrganization(uri);
    }
}