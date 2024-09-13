import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { License } from '../../../models/License';
import { FormControl, FormGroup } from '@angular/forms';
import { LicenseViewComponent } from '../license-view.component';

@Component({
    template: '',
})
export abstract class LicenseWriteComponent extends LicenseViewComponent {

    formGroup: FormGroup;

    protected title$: Observable<string>;

    constructor(protected readonly router: Router) {
        super();
    }

    submit(): void {
        const license = { ...this.formGroup.value };
        this.onSubmit(license).pipe(take(1), tap(() => this.router.navigate(['/organizations/licenses'], { queryParams: { licenses: this.queryParams['licenses'] } }))).subscribe();
    }

    protected abstract onSubmit(license: License): Observable<License>;

    protected override onEntityChange(license: License): void {
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
