import { Component, Input } from '@angular/core';
import { LicenseContext } from '../../../contexts/license.context';
import { LicenseSearchCriteria } from '../../../criteria/license-search-criteria';
import { License } from '../../../dtos/license';
import { Organization } from '../../../dtos/organization';
import { LicenseEvent } from '../../../events/license.event';
import { EntityListViewComponent } from '../../../views/entity-list-view.component';

@Component({
	selector: 'app-license-list',
	templateUrl: './license-list.component.html',
	styleUrl: './license-list.component.css',
	standalone: false
})
export class LicenseListComponent extends EntityListViewComponent<License, LicenseEvent, LicenseSearchCriteria, LicenseContext> {
	@Input() organization: Organization;
}
