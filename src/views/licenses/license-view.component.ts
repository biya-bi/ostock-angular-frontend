import { Component } from '@angular/core';
import { License } from '../../models/License';
import { EntityViewComponent } from '../entity-view.component';

@Component({
  template: '',
})
export abstract class LicenseViewComponent extends EntityViewComponent<License> {
}
