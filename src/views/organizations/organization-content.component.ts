import { Component, Input } from '@angular/core';
import { Organization } from '../../models/organization';
import { ViewComponent } from '../view.component';

@Component({
  template: '',
})
export abstract class OrganizationContentComponent extends ViewComponent {

  private _organization: Organization;

  @Input()
  set organization(value: Organization) {
    if (this._organization !== value) {
      this._organization = value;
      this.onOrganizationChange(value, this._organization);
    }
  }

  get organization(): Organization {
    return this._organization;
  }

  protected onOrganizationChange(newOrganization: Organization, oldOrganization?: Organization) {
  }
}
