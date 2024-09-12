import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { License } from '../../../models/License';
import { LicenseContentComponent } from '../license-content/license-content.component';

@Component({
    template: '',
})
export abstract class LicenseWriteComponent extends LicenseContentComponent {

    constructor(protected override readonly router: Router) {
        super(router);
    }

    submit(): void {
        const license = { ...this.formGroup.value };
        this.onSubmit(license).pipe(take(1), tap(() => this.router.navigate(['/licenses'], { queryParams: { organizationId: this.params['organizationId'] } }))).subscribe();
    }

    protected abstract onSubmit(license: License): Observable<License>;

}
