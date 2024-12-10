import { Component } from '@angular/core';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-details',
    templateUrl: './organization-details.component.html',
    styleUrl: './organization-details.component.css',
    standalone: false
})
export class OrganizationDetailsComponent extends OrganizationViewComponent {
}
