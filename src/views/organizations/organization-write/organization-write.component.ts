import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { Organization } from '../../../models/organization';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-write',
    templateUrl: './organization-write.component.html',
    styleUrl: './organization-write.component.css'
})
export class OrganizationWriteComponent extends OrganizationViewComponent {

    protected title$: Observable<string>;

    formGroup: FormGroup;

    protected override onEntityChange(organization: Organization): void {
        this.formGroup = new FormGroup({
            id: new FormControl(organization?.id),
            name: new FormControl(organization?.name),
            contactName: new FormControl(organization?.contactName),
            contactEmail: new FormControl(organization?.contactEmail),
            contactPhone: new FormControl(organization?.contactPhone),
            _links: new FormControl(organization?._links),
        });
    }

}
