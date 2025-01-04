import { Component, EventEmitter, Output } from '@angular/core';
import { OrganizationContext } from '../../contexts/organization.context';
import { Organization } from '../../dtos/organization';
import { LicenseSearchEvent } from '../../events/license-search.event';
import { LicenseEvent } from '../../events/license.event';
import { SortEvent } from '../../events/sort.event';
import { EntityViewComponent } from '../../views/entity-view.component';

@Component({
  template: ''
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization, OrganizationContext> {
  @Output() writeLicense = new EventEmitter<LicenseEvent>();
  @Output() licensePageChange = new EventEmitter<number>();
  @Output() searchLicenses = new EventEmitter<LicenseSearchEvent>();
  @Output() sortLicenses = new EventEmitter<SortEvent>();
}
