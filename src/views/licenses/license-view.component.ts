import { Component, Input } from '@angular/core';
import { License } from '../../dtos/license';
import { Organization } from '../../dtos/organization';
import { EntityViewComponent } from '../entity-view.component';
import { LicenseEvent } from '../../events/license-event';

@Component({
  template: '',
})
export abstract class LicenseViewComponent extends EntityViewComponent<License, LicenseEvent> {
  @Input() organization: Organization;
}
