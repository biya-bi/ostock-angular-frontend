import { Component } from '@angular/core';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-delete',
    templateUrl: './organization-delete.component.html',
    styleUrl: './organization-delete.component.css',
    standalone: false
})
export class OrganizationDeleteComponent extends OrganizationViewComponent {
}
