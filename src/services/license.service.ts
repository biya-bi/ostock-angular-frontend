import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LicenseConnector } from '../connectors/license.connector';
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

    constructor(protected override readonly searchService: SearchService, private readonly connector: LicenseConnector) {
        super(searchService);
    }

    protected override onRead(searchEvent: SearchEvent<LicenseSearchCriteria>, uri?: string): Observable<Page<LicenseListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;
        return this.connector.read(searchCriteria, pageRequest, uri);
    }

    override create(entity: License): Observable<License> {
        return this.connector.create(entity, entity.organization._links.addLicense.href);
    }

    override update(entity: License): Observable<License> {
        return this.connector.update(entity, entity._links.update.href);
    }

    override delete(uri: string): Observable<void> {
        return this.connector.delete(uri);
    }

    override readByUrl(url: string): Observable<License> {
        return this.connector.readByUrl(url);
    }
}