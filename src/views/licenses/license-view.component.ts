import { Component, Input } from '@angular/core';
import { License } from '../../models/License';
import { EntityViewComponent } from '../entity-view.component';
import { WriteMode } from '../../models/write-mode';
import { Organization } from '../../models/organization';

@Component({
  template: '',
})
export abstract class LicenseViewComponent extends EntityViewComponent<License> {
  @Input() organization: Organization;
  @Input() mode: WriteMode;
}
