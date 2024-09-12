import { Component, Input } from '@angular/core';
import { Organization } from '../../../models/organization';
import { ViewComponent } from '../../view.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent extends ViewComponent {

  @Input() organizations: Organization[];

}
