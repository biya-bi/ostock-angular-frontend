import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organization } from '../../models/organization';
import { EntityViewComponent } from '../entity-view.component';
import { License } from '../../models/License';
import { LicenseWriteEvent } from '../../models/license-write-event';
import { OrganizationWriteEvent } from '../../models/organization-write-event';
import { WriteMode } from '../../models/write-mode';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization> {
  @Input() licenses: License[];
  @Input() mode: WriteMode;

  @Output() write = new EventEmitter<OrganizationWriteEvent>();
  @Output() writeLicense = new EventEmitter<LicenseWriteEvent>();
  @Output() loadLicenses = new EventEmitter<string>();

  WriteMode = WriteMode;
}
