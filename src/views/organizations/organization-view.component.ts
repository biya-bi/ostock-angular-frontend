import { Component, EventEmitter, Input, Output } from '@angular/core';
import { License } from '../../models/License';
import { LicenseEvent } from '../../models/license-event';
import { Organization } from '../../models/organization';
import { OrganizationEvent } from '../../models/organization-event';
import { EntityViewComponent } from '../entity-view.component';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization, OrganizationEvent> {
  @Input() licenses: License[];

  @Output() writeLicense = new EventEmitter<LicenseEvent>();
  @Output() loadLicenses = new EventEmitter<string>();
}
