import { Component, Input } from '@angular/core';
import { Organization } from '../../../models/organization';
import { ViewComponent } from '../../view.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.css'
})
export class OrganizationDetailsComponent extends ViewComponent {

  @Input() organization: Organization;

}
