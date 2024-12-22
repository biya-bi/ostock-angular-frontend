import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConnector } from '../connectors/api.connector';
import { LicenseSearchCriteria } from '../criteria/license-search-criteria';
import { License } from '../dtos/license';
import { LicenseListWrapper } from '../dtos/license-list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';

@Injectable({
    providedIn: 'root'
})
export class LicenseService extends EntityService<License, LicenseSearchCriteria> {

    constructor(protected override readonly searchService: SearchService, private readonly apiConnector: ApiConnector) {
        super(searchService);
    }

    protected override onRead(searchEvent: SearchEvent<LicenseSearchCriteria>, uri?: string): Observable<Page<LicenseListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;
        return this.apiConnector.readLicenses(searchCriteria, pageRequest, uri);
    }

    override create(entity: License): Observable<License> {
        return this.apiConnector.createLicense(entity, entity.organization._links.addLicense.href);
    }

    override update(entity: License): Observable<License> {
        return this.apiConnector.updateLicense(entity);
    }

    override delete(uri: string): Observable<void> {
        return this.apiConnector.delete(uri);
    }

    override readByUri(uri: string): Observable<License> {
        return this.apiConnector.readLicense(uri);
    }
}