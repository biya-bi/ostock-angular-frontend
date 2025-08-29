import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LicenseConnector } from '../connectors/license.connector';
import { LicenseSearchCriteria } from '../criteria/license-search-criteria';
import { License } from '../dtos/license';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class LicenseService extends EntityService<
  License,
  LicenseSearchCriteria
> {
  constructor(
    protected override readonly searchService: SearchService,
    protected override readonly connector: LicenseConnector,
  ) {
    super(searchService, connector);
  }

  override create(entity: License): Observable<License> {
    const url = entity.organization._links.addLicense.href;
    const payload = this.serialize(entity);
    return this.connector.create(payload, url);
  }

  protected override getTransientFields(): string[] {
    return ['_links', 'organization'];
  }
}
