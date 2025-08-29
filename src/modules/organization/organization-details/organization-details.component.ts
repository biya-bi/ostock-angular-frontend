import { Component } from '@angular/core';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  standalone: false,
})
export class OrganizationDetailsComponent extends OrganizationViewComponent {}
