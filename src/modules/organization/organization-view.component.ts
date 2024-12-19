import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { License } from '../../dtos/license';
import { Organization } from '../../dtos/organization';
import { OrganizationEvent } from '../../events/organization.event';
import { EntityViewComponent } from '../../views/entity-view.component';
import { LicenseListComponent } from '../license/license-list/license-list.component';
import { LicenseEvent } from '../../events/license.event';
import { OrganizationSearchCriteria } from '../../criteria/organization-search-criteria';
import { OrganizationContext } from '../../contexts/organization.context';

@Component({
  template: '',
  standalone: false
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization, OrganizationEvent, OrganizationSearchCriteria, OrganizationContext> {
  @Input() licenses: License[];

  @Output() writeLicense = new EventEmitter<LicenseEvent>();
  @Output() loadLicenses = new EventEmitter<string>();

  @ViewChild(LicenseListComponent) licenseListComponent: LicenseListComponent;
}
