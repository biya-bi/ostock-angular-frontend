import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { License } from '../../../models/License';

@Component({
    template: '',
})
export abstract class LicenseContentComponent {

    private _license: License;

    @Input() organizationId: string

    protected title$: Observable<string>;

    formGroup: FormGroup;

    constructor(protected readonly router: Router) { }

    protected initFormGroup(license?: License): void {
        this.formGroup = new FormGroup({
            id: new FormControl(license?.id),
            productName: new FormControl(license?.productName),
            description: new FormControl(license?.description),
            comment: new FormControl(license?.comment),
            licenseType: new FormControl(license?.licenseType),
            _links: new FormControl(license?._links),
        });
    }

    @Input()
    set license(value: License) {
      if (this._license !== value) {
        this._license = value;
        this.initFormGroup(value);
      }
    }
  
    get license(): License {
      return this._license;
    }

}
