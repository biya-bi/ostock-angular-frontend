import { Component, Input } from '@angular/core';
import { License } from '../../../dtos/license';
import { Operation } from '../../../models/operation';
import { Organization } from '../../../dtos/organization';
import { EntityListViewComponent } from '../../../views/entity-list-view.component';
import { LicenseEvent } from '../../../events/license.event';
import { LicenseSearchCriteria } from '../../../criteria/license-search-criteria';

@Component({
    selector: 'app-license-list',
    templateUrl: './license-list.component.html',
    styleUrl: './license-list.component.css',
    standalone: false
})
export class LicenseListComponent extends EntityListViewComponent<License, LicenseEvent, LicenseSearchCriteria> {
  @Input() organization: Organization;

  selectedLicense: License;
  operation: Operation;
}
