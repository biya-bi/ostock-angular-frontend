import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organization } from '../../models/organization';
import { EntityViewComponent } from '../entity-view.component';
import { License } from '../../models/License';
import { LicenseWriteEvent } from '../../models/license-write-event';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization> {
  @Input() licenses: License[];
  @Output() writeLicense = new EventEmitter<LicenseWriteEvent>();
  @Output() loadLicenses = new EventEmitter<string>();
}
