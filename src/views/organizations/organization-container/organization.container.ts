import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { ModalResponse } from '../../../models/modal-response';
import { ViewComponent } from '../../view.component';
import { OrganizationContentComponent } from '../organization-content.component';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'app-organization-container',
  templateUrl: './organization.container.html',
  styleUrl: './organization.container.css'
})
export class OrganizationContainer {

  constructor(private readonly apiConnector: ApiConnector, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  onActivate(component: ViewComponent) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    component.queryParams = queryParams;
    if (component instanceof OrganizationListComponent) {
      this.apiConnector.readOrganizations().pipe(take(1), tap(organizations => component.organizations = organizations)).subscribe();
    } else if (component instanceof OrganizationContentComponent) {
      this.apiConnector.readOrganization(queryParams['uri']).pipe(take(1), tap(organization => component.organization = organization)).subscribe();
    }
  }

  onResponse(response: ModalResponse) {
    if (response.answer === 'YES') {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      this.apiConnector.deleteOrganization(queryParams['uri']).pipe(take(1),
        tap(() => {
          response.closeElement.click();
          this.router.navigate(['/organizations']);
        })).subscribe();
    }
  }

}
