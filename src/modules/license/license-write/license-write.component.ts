import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicenseContext } from '../../../contexts/license.context';
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

	readonly formGroup: FormGroup = this.formBuilder.group({
		productName: ['', Validators.required],
		description: [''],
		comment: [''],
		licenseType: ['', Validators.required],
		_links: [{}],
		organization: [undefined, Validators.required],
	});

	constructor(private readonly formBuilder: FormBuilder) {
		super();
	}

	protected override onContextChange(context: LicenseContext): void {
		super.onContextChange(context);

		const entity = context?.selectedEntity || {};

		this.formGroup.patchValue(entity);
	}
}
