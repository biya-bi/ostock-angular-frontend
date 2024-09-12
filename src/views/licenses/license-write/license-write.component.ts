import { Component } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { License } from '../../../models/License';
import { LicenseContentComponent } from '../license-content/license-content.component';

@Component({
    template: '',
})
export abstract class LicenseWriteComponent extends LicenseContentComponent {

    submit(): void {
        const license = { ...this.formGroup.value };
        this.onSubmit(license).pipe(take(1), tap(() => this.router.navigate(['/licenses']))).subscribe();
    }

    protected abstract onSubmit(license: License): Observable<License>;

}
