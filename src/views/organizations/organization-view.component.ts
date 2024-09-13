import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organization } from '../../models/organization';
import { EntityViewComponent } from '../entity-view.component';
import { License } from '../../models/License';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization> {
  @Input() licenses: License[];
  @Output() loadLicenses = new EventEmitter<string>();
}
