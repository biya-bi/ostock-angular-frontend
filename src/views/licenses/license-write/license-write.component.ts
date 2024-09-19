import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { License } from '../../../models/license';
import { LicenseViewComponent } from '../license-view.component';

@Component({
    selector: 'app-license-write',
    templateUrl: './license-write.component.html',
    styleUrl: './license-write.component.css'
})
export class LicenseWriteComponent extends LicenseViewComponent implements OnInit {
    formGroup: FormGroup;

    ngOnInit(): void {
        this.initFormGroup();
    }

    protected override onEntityChange(license: License): void {
        this.initFormGroup(license);
    }

    private initFormGroup(license?: License): void {
        this.formGroup = new FormGroup({
            productName: new FormControl(license?.productName),
            description: new FormControl(license?.description),
            comment: new FormControl(license?.comment),
            licenseType: new FormControl(license?.licenseType),
            _links: new FormControl(license?._links),
        });
    }
}
