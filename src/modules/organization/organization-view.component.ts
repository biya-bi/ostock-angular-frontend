import { Component, EventEmitter, Output } from '@angular/core';
import { OrganizationContext } from '../../contexts/organization.context';
import { Organization } from '../../dtos/organization';
import { LicenseSearchEvent } from '../../events/license-search.event';
import { SortEvent } from '../../events/sort.event';
import { EntityViewComponent } from '../../views/entity-view.component';
import { License } from '../../dtos/license';
import { EntityEvent } from '../../events/entity.event';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<
  Organization,
  OrganizationContext
> {
  @Output() writeLicense = new EventEmitter<EntityEvent<License>>();
  @Output() licensePageChange = new EventEmitter<number>();
  @Output() searchLicenses = new EventEmitter<LicenseSearchEvent>();
  @Output() sortLicenses = new EventEmitter<SortEvent>();
}
