import { Component, Input } from '@angular/core';
import { License } from '../../models/License';
import { LicenseEvent } from '../../models/license-event';
import { Organization } from '../../models/organization';
import { EntityViewComponent } from '../entity-view.component';

@Component({
  template: '',
})
export abstract class LicenseViewComponent extends EntityViewComponent<License, LicenseEvent> {
  @Input() organization: Organization;
}
