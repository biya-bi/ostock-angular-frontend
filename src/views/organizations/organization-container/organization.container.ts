import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { License } from '../../../models/License';
import { LicenseEvent } from '../../../models/license-event';
import { Operation } from '../../../models/operation';
import { OrganizationEvent } from '../../../models/organization-event';
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
    if (component instanceof OrganizationListComponent) {
      this.readOrganizations(component);
    } else if (component instanceof OrganizationViewComponent) {
      this.setTitle(component);
      this.readOrganization(component);
      this.subscribeToEvents(component);
    }
  }

  private readOrganizations(component: OrganizationListComponent): void {
    this.apiConnector.readOrganizations().pipe(take(1), tap(organizations => component.entities = organizations)).subscribe();
  }

  private setTitle(component: OrganizationViewComponent): void {
    // TODO: Get title from localized resources
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const operation = queryParams['operation'];
    switch (operation) {
      case Operation.Create:
        component.title = "Add an organization"
        break;
      case Operation.Update:
        component.title = "Edit organization"
        break;
      case Operation.Read:
        component.title = "Organization details"
        break;
    }
  }

  private readOrganization(component: OrganizationViewComponent): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.apiConnector.readOrganization(queryParams['uri']).pipe(
      take(1),
      tap(organization => {
        component.entity = organization;
        component.operation = queryParams['operation'];
      })).subscribe();
  }

  private writeOrganization(event: OrganizationEvent): Observable<void> {
    let obs$: Observable<any>;
    switch (event.operation) {
      case Operation.Create:
        obs$ = this.apiConnector.createOrganization(event.entity);
        break;
      case Operation.Update:
        obs$ = this.apiConnector.updateOrganization(event.entity);
        break;
      case Operation.Delete:
        obs$ = this.apiConnector.deleteOrganization(event.entity._links.delete.href);
        break;
    }
    return obs$.pipe(take(1),
      tap(() => {
        event.closeElement?.click();
        this.router.navigate(['/organizations']);
      }));
  }

  private subscribeToEvents(component: OrganizationViewComponent) {
    component.manage.pipe(takeUntil(this.destroy$), switchMap(event => this.writeOrganization(event))).subscribe();
    component.loadLicenses.pipe(takeUntil(this.destroy$), switchMap(uri => this.readLicenses(uri, component))).subscribe();
    component.writeLicense.pipe(takeUntil(this.destroy$), switchMap(event => this.writeLicense(event, component))).subscribe();
  }

  private readLicenses(uri: string, component: OrganizationViewComponent): Observable<License[]> {
    return this.apiConnector.readLicenses(uri).pipe(take(1), tap(licenses => component.licenses = licenses));
  }

  private writeLicense(event: LicenseEvent, component: OrganizationViewComponent): Observable<License[]> {
    let obs$: Observable<any>;
    switch (event.operation) {
      case Operation.Create:
        obs$ = this.apiConnector.createLicense(event.entity, event.organization._links.licenses.href);
        break;
      case Operation.Update:
        obs$ = this.apiConnector.updateLicense(event.entity);
        break;
      case Operation.Delete:
        obs$ = this.apiConnector.delete(event.entity._links.delete.href);
        break;
    }
    return obs$.pipe(take(1), switchMap(() => this.readLicenses(event.organization._links.licenses.href, component)), tap(() => event.closeElement.click()));
  }
}
