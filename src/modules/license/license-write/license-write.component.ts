import { Component, Input } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { LicenseContext } from '../../../contexts/license.context';
import { Organization } from '../../../dtos/organization';
import { BLANK_STRING_REGEX } from '../../validation/regexs';
import { LicenseViewComponent } from '../license-view.component';
import { LicenseLinks } from '../../../dtos/license-links';

@Component({
  selector: 'app-license-write',
  templateUrl: './license-write.component.html',
  standalone: false,
})
export class LicenseWriteComponent extends LicenseViewComponent {
  @Input() organizations: Organization[];

  readonly formGroup = this.formBuilder.group({
    productName: [
      '',
      [Validators.required, Validators.pattern(BLANK_STRING_REGEX)],
    ],
    description: [''],
    comment: [''],
    licenseType: [
      '',
      [Validators.required, Validators.pattern(BLANK_STRING_REGEX)],
    ],
    _links: [null as LicenseLinks],
    organization: [null as Organization, Validators.required],
  });

  constructor(private readonly formBuilder: NonNullableFormBuilder) {
    super();
  }

  protected override onContextChange(context: LicenseContext): void {
    super.onContextChange(context);

    this.formGroup.patchValue(context?.selectedEntity);
  }
}
