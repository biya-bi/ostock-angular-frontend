import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { License } from '../../../models/License';
import { LicenseWriteEvent } from '../../../models/license-write-event';
import { OrganizationWriteEvent } from '../../../models/organization-write-event';
import { WriteMode } from '../../../models/write-mode';
import { BaseComponent } from '../../base.component';
import { ViewComponent } from '../../view.component';
import { OrganizationListComponent } from '../organization-list/organization-list.component';
import { OrganizationViewComponent } from '../organization-view.component';

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
      this.readOrganization(component);
      this.subscribeToEvents(component);
    }
  }

  private readOrganization(component: OrganizationViewComponent): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.apiConnector.readOrganization(queryParams['uri']).pipe(
      take(1),
      tap(organization => {
        component.entity = organization;
        component.mode = queryParams['mode'];
      })).subscribe();
  }

  private writeOrganization(event: OrganizationWriteEvent): Observable<void> {
    let obs$: Observable<any>;
    switch (event.mode) {
      case WriteMode.Create:
        obs$ = this.apiConnector.createOrganization(event.organization);
        break;
      case WriteMode.Update:
        obs$ = this.apiConnector.updateOrganization(event.organization);
        break;
      case WriteMode.Delete:
        obs$ = this.apiConnector.deleteOrganization(event.organization._links.delete.href);
        break;
    }
    return obs$.pipe(take(1),
      tap(() => {
        event.closeElement?.click();
        this.router.navigate(['/organizations']);
      }));
  }

  private subscribeToEvents(component: OrganizationViewComponent) {
    component.write.pipe(takeUntil(this.destroy$), switchMap(event => this.writeOrganization(event))).subscribe();
    component.loadLicenses.pipe(takeUntil(this.destroy$), switchMap(uri => this.readLicenses(uri, component))).subscribe();
    component.writeLicense.pipe(takeUntil(this.destroy$), switchMap(event => this.writeLicense(event, component))).subscribe();
  }

  private readLicenses(uri: string, component: OrganizationViewComponent): Observable<License[]> {
    return this.apiConnector.readLicenses(uri).pipe(take(1), tap(licenses => component.licenses = licenses));
  }

  private writeLicense(event: LicenseWriteEvent, component: OrganizationViewComponent): Observable<License[]> {
    let obs$: Observable<any>;
    if (event.mode === WriteMode.Update) {
      obs$ = this.apiConnector.updateLicense(event.license);
    } else if (event.mode === WriteMode.Delete) {
      obs$ = this.apiConnector.delete(event.license._links.delete.href);
    } else {
      obs$ = this.apiConnector.createLicense(event.license, event.organization._links.licenses.href)
    }
    return obs$.pipe(take(1), switchMap(() => this.readLicenses(event.organization._links.licenses.href, component)), tap(() => event.closeElement.click()));
  }
}
