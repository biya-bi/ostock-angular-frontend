import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConnector } from '../connectors/api.connector';
import { LicenseSearchCriteria } from '../criteria/license-search-criteria';
import { LicenseListWrapper } from '../dtos/license-list-wrapper';
import { Page } from '../dtos/page';
import { SearchEvent } from '../events/search.event';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';

@Injectable({
    providedIn: 'root'
})
export class LicenseService extends EntityService<LicenseSearchCriteria, LicenseListWrapper> {

    constructor(protected override readonly searchService: SearchService, private readonly apiConnector: ApiConnector) {
        super(searchService);
    }

    protected override onRead(searchEvent: SearchEvent<LicenseSearchCriteria>): Observable<Page<LicenseListWrapper>> {
        const { searchCriteria, pageRequest } = searchEvent;
        return this.apiConnector.readLicenses(searchCriteria, pageRequest);
    }
}