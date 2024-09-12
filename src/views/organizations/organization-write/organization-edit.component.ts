import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { Organization } from '../../../models/organization';
import { OrganizationWriteComponent } from './organization-write.component';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-write.component.html',
  styleUrl: './organization-write.component.css'
})
export class OrganizationEditComponent extends OrganizationWriteComponent {

  constructor(protected override readonly router: Router, private readonly apiConnector: ApiConnector) {
    super(router);
  }

  ngOnInit(): void {
    // TODO: Get title from localized resources
    this.title$ = of('Edit organization');
  }

  protected override onSubmit(organization: Organization): Observable<Organization> {
    return this.apiConnector.updateOrganization(organization);
  }

}
