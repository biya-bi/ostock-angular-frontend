import { Component } from '@angular/core';
import { LicenseContext } from '../../../contexts/license.context';
import { License } from '../../../dtos/license';
import { LicenseSearchEvent } from '../../../events/license-search.event';
import { EntityListViewComponent } from '../../../views/entity-list-view.component';

@Component({
	selector: 'app-license-list',
	templateUrl: './license-list.component.html',
	styleUrl: './license-list.component.css',
	standalone: false
})
export class LicenseListComponent extends EntityListViewComponent<License, LicenseContext, LicenseSearchEvent> {
}
