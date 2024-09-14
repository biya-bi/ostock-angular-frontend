import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { License } from '../../../models/License';
import { FormControl, FormGroup } from '@angular/forms';
import { LicenseViewComponent } from '../license-view.component';
import { LicenseWriteEvent } from '../../../models/license-write-event';
import { Organization } from '../../../models/organization';
import { WriteMode } from '../../../models/write-mode';

@Component({
    selector: 'app-license-write',
    templateUrl: './license-write.component.html',
    styleUrl: './license-write.component.css'
})
export class LicenseWriteComponent extends LicenseViewComponent implements OnInit {

    @Input() title: string;
    @Input() organization: Organization;
    @Input() mode: WriteMode;
    @Output() save = new EventEmitter<LicenseWriteEvent>();

    formGroup: FormGroup;

    protected title$: Observable<string>;

    constructor(protected readonly router: Router) {
        super();
    }

    ngOnInit(): void {
        this.initFormGroup();
    }

    protected override onEntityChange(license: License): void {
        this.initFormGroup(license);
    }

    private initFormGroup(license?: License): void {
        this.formGroup = new FormGroup({
            id: new FormControl(license?.id),
            productName: new FormControl(license?.productName),
            description: new FormControl(license?.description),
            comment: new FormControl(license?.comment),
            licenseType: new FormControl(license?.licenseType),
            _links: new FormControl(license?._links),
        });
    }
}
