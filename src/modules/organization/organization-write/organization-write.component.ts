import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationContext } from '../../../contexts/organization.context';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-write',
    templateUrl: './organization-write.component.html',
    styleUrl: './organization-write.component.css',
    standalone: false
})
export class OrganizationWriteComponent extends OrganizationViewComponent {

    formGroup: FormGroup;

    protected override onContextChange(context: OrganizationContext): void {
        super.onContextChange(context);

        const entity = context?.selectedEntity;

        this.formGroup = new FormGroup({
            name: new FormControl(entity?.name, Validators.required),
            contactName: new FormControl(entity?.contactName, Validators.required),
            contactEmail: new FormControl(entity?.contactEmail, Validators.required),
            contactPhone: new FormControl(entity?.contactPhone, Validators.required),
            _links: new FormControl(entity?._links),
        });
    }

}
