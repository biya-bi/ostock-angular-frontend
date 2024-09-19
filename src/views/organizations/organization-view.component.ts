import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { License } from '../../models/license';
import { LicenseEvent } from '../../models/license-event';
import { Organization } from '../../models/organization';
import { OrganizationEvent } from '../../models/organization-event';
import { EntityViewComponent } from '../entity-view.component';
import { LicenseListComponent } from '../licenses/license-list/license-list.component';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization, OrganizationEvent> {
  @Input() licenses: License[];

  @Output() writeLicense = new EventEmitter<LicenseEvent>();
  @Output() loadLicenses = new EventEmitter<string>();

  @ViewChild(LicenseListComponent) licenseListComponent: LicenseListComponent;
}
