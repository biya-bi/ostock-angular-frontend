import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
            name: new FormControl(entity?.name),
            contactName: new FormControl(entity?.contactName),
            contactEmail: new FormControl(entity?.contactEmail),
            contactPhone: new FormControl(entity?.contactPhone),
            _links: new FormControl(entity?._links),
        });
    }

}
