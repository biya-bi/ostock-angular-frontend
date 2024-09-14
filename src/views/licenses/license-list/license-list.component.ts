import { Component, EventEmitter, Input, Output } from '@angular/core';
import { License } from '../../../models/License';
import { Organization } from '../../../models/organization';
import { EntityListViewComponent } from '../../entity-list-view.component';
import { LicenseEvent } from '../../../models/license-event';
import { Operation } from '../../../models/operation';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css'
})
export class LicenseListComponent extends EntityListViewComponent<License> {
  @Input() organization: Organization;
  @Output() write = new EventEmitter<LicenseEvent>();

  WriteMode = Operation;

  selectedLicense: License;
  operation: Operation;
  crudTitle: string;
}
