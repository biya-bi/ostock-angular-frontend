import { Component, EventEmitter, Output } from '@angular/core';
import { OrganizationContext } from '../../contexts/organization.context';
import { OrganizationSearchCriteria } from '../../criteria/organization-search-criteria';
import { Organization } from '../../dtos/organization';
import { LicenseSearchEvent } from '../../events/license-search.event';
import { LicenseEvent } from '../../events/license.event';
import { OrganizationEvent } from '../../events/organization.event';
import { EntityViewComponent } from '../../views/entity-view.component';

@Component({
  template: '',
  standalone: false
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization, OrganizationEvent, OrganizationSearchCriteria, OrganizationContext> {
  @Output() writeLicense = new EventEmitter<LicenseEvent>();
  @Output() licensePageChange = new EventEmitter<number>();
  @Output() searchLicenses = new EventEmitter<LicenseSearchEvent>();
}
