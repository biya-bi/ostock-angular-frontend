import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { OrganizationContext } from '../../../contexts/organization.context';
import { OrganizationLinks } from '../../../dtos/organization-links';
import { BLANK_STRING_REGEX } from '../../validation/regexs';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-write',
    templateUrl: './organization-write.component.html',
    styleUrl: './organization-write.component.css',
    standalone: false
})
export class OrganizationWriteComponent extends OrganizationViewComponent {

    readonly formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(BLANK_STRING_REGEX)]],
        contactName: ['', [Validators.required, Validators.pattern(BLANK_STRING_REGEX)]],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhone: ['', [Validators.required, Validators.pattern(BLANK_STRING_REGEX)]],
        _links: [null as OrganizationLinks],
    })

    constructor(private readonly formBuilder: NonNullableFormBuilder) {
        super();
    }

    protected override onContextChange(context: OrganizationContext): void {
        super.onContextChange(context);

        this.formGroup.patchValue(context?.selectedEntity);
    }

}
