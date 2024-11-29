import { Component, Input } from '@angular/core';
import { License } from '../../../models/license';
import { LicenseEvent } from '../../../models/license-event';
import { LicenseSearchCriteria } from '../../../models/license-search-criteria';
import { Operation } from '../../../models/operation';
import { Organization } from '../../../models/organization';
import { EntityListViewComponent } from '../../entity-list-view.component';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css'
})
export class LicenseListComponent extends EntityListViewComponent<License, LicenseEvent, LicenseSearchCriteria> {
  @Input() organization: Organization;

  selectedLicense: License;
  operation: Operation;
  crudTitle: string;
}
