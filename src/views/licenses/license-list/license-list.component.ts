import { Component, EventEmitter, Input, Output } from '@angular/core';
import { License } from '../../../models/License';
import { Organization } from '../../../models/organization';
import { EntityListViewComponent } from '../../entity-list-view.component';
import { LicenseWriteEvent } from '../../../models/license-write-event';
import { WriteMode } from '../../../models/write-mode';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css'
})
export class LicenseListComponent extends EntityListViewComponent<License> {
  @Input() organization: Organization;
  @Output() write = new EventEmitter<LicenseWriteEvent>();

  WriteMode = WriteMode;

  selectedLicense: License;
  mode: WriteMode;
  crudTitle: string;
}
