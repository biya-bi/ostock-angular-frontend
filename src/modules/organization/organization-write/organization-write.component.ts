import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationContext } from '../../../contexts/organization.context';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-write',
    templateUrl: './organization-write.component.html',
    styleUrl: './organization-write.component.css',
    standalone: false
})
export class OrganizationWriteComponent extends OrganizationViewComponent {

    readonly formGroup: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        contactName: ['', Validators.required],
        contactEmail: ['', Validators.required],
        contactPhone: ['', Validators.required],
        _links: [{}],
    })

    constructor(private readonly formBuilder: FormBuilder) {
        super();
    }

    protected override onContextChange(context: OrganizationContext): void {
        super.onContextChange(context);

        const entity = context?.selectedEntity || {};

        this.formGroup.patchValue(entity);
    }

}
