import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationConnector } from '../connectors/organization.connector';
import { OrganizationSearchCriteria } from '../criteria/organization-search-criteria';
import { Organization } from '../dtos/organization';
import { OrganizationListWrapper } from '../dtos/organization-list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService extends EntityService<Organization, OrganizationSearchCriteria> {

    constructor(protected override readonly searchService: SearchService, private readonly connector: OrganizationConnector) {
        super(searchService);
    }

    protected override onRead(searchEvent: SearchEvent<OrganizationSearchCriteria>): Observable<Page<OrganizationListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;
        return this.connector.read(searchCriteria, pageRequest);
    }

    override create(entity: Organization): Observable<Organization> {
        return this.connector.create(entity);
    }

    override update(entity: Organization): Observable<Organization> {
        return this.connector.update(entity, entity._links.update.href);
    }

    override delete(uri: string): Observable<void> {
        return this.connector.delete(uri);
    }

    override readByUrl(url: string): Observable<Organization> {
        return this.connector.readByUrl(url);
    }
}