import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { LicenseContext } from '../../../contexts/license.context';
import { License } from '../../../dtos/license';
import { Organization } from '../../../dtos/organization';
import { LicenseViewComponent } from '../license-view.component';

@Component({
	selector: 'app-license-write',
	templateUrl: './license-write.component.html',
	styleUrl: './license-write.component.css',
	standalone: false
})
export class LicenseWriteComponent extends LicenseViewComponent {
	@Input() organizations: Organization[];

	@Output() organizationSelected = new EventEmitter<Organization>();

	formGroup: FormGroup;

	readonly searchOrganizationSubject = new Subject<string>();

	protected override onContextChange(context: LicenseContext): void {
		const entity: License = context?.selectedEntity ? context.selectedEntity : {} as License;

		this.formGroup = new FormGroup({
			productName: new FormControl(entity.productName),
			description: new FormControl(entity.description),
			comment: new FormControl(entity.comment),
			licenseType: new FormControl(entity.licenseType),
			_links: new FormControl(entity._links),
			organization: new FormControl(entity._links?.organization?.href),
		});
	}
}
