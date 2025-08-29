import { Injectable } from '@angular/core';
import { OrganizationConnector } from '../connectors/organization.connector';
import { OrganizationSearchCriteria } from '../criteria/organization-search-criteria';
import { Organization } from '../dtos/organization';
import { EntityService } from './entity.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends EntityService<
  Organization,
  OrganizationSearchCriteria
> {
  constructor(
    protected override readonly searchService: SearchService,
    protected override readonly connector: OrganizationConnector,
  ) {
    super(searchService, connector);
  }
}
