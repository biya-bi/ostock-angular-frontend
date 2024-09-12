import { Component } from '@angular/core';
import { Organization } from '../../models/organization';
import { EntityViewComponent } from '../entity-view.component';

@Component({
  template: '',
})
export abstract class OrganizationViewComponent extends EntityViewComponent<Organization> {
}
