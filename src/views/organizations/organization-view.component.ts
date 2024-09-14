import { Component, EventEmitter, Input, Output } from '@angular/core';
import { License } from '../../models/License';
import { LicenseEvent } from '../../models/license-event';
import { Operation } from '../../models/operation';
import { Organization } from '../../models/organization';
import { OrganizationEvent } from '../../models/organization-event';
import { EntityViewComponent } from '../entity-view.component';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization> {
  @Input() licenses: License[];
  @Input() operation: Operation;

  @Output() write = new EventEmitter<OrganizationEvent>();
  @Output() writeLicense = new EventEmitter<LicenseEvent>();
  @Output() loadLicenses = new EventEmitter<string>();
}
