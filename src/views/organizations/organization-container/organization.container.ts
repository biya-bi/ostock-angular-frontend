import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { ModalResponse } from '../../../models/modal-response';
import { ViewComponent } from '../../view.component';
import { OrganizationViewComponent } from '../organization-view.component';
import { OrganizationListComponent } from '../organization-list/organization-list.component';
import { BaseComponent } from '../../base.component';
import { WriteMode } from '../../../models/write-mode';
import { License } from '../../../models/License';
import { LicenseWriteEvent } from '../../../models/license-write-event';

@Component({
  selector: 'app-organization-container',
  templateUrl: './organization.container.html',
  styleUrl: './organization.container.css'
})
export class OrganizationContainer extends BaseComponent {

  constructor(private readonly apiConnector: ApiConnector, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    super();
  }

  onActivate(component: ViewComponent) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    component.queryParams = queryParams;
    if (component instanceof OrganizationListComponent) {
      this.apiConnector.readOrganizations().pipe(take(1), tap(organizations => component.entities = organizations)).subscribe();
    } else if (component instanceof OrganizationViewComponent) {
      this.apiConnector.readOrganization(queryParams['uri']).pipe(take(1), tap(organization => component.entity = organization)).subscribe();
      this.subscribeToEvents(component);
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

  private subscribeToEvents(component: OrganizationViewComponent) {
    component.loadLicenses.pipe(takeUntil(this.destroy$), switchMap(uri => this.readLicenses(uri, component))).subscribe();
    component.writeLicense.pipe(takeUntil(this.destroy$), switchMap(event => this.writeLicense(event, component))).subscribe();
  }

  private readLicenses(uri: string, component: OrganizationViewComponent): Observable<License[]> {
    return this.apiConnector.readLicenses(uri).pipe(take(1), tap(licenses => component.licenses = licenses));
  }

  private writeLicense(event: LicenseWriteEvent, component: OrganizationViewComponent): Observable<License[]> {
    const obs$ = event.mode == WriteMode.Update ? this.apiConnector.updateLicense(event.license) : this.apiConnector.createLicense(event.license, event.organization?._links.licenses.href);
    return obs$.pipe(take(1), switchMap(() => this.readLicenses(event.organization._links.licenses.href, component)), tap(() => event.closeElement.click()));
  }
}
