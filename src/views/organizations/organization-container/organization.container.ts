import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { License } from '../../../dtos/license';
import { Organization } from '../../../dtos/organization';
import { OrganizationListWrapper } from '../../../dtos/organization-list-wrapper';
import { Page } from '../../../dtos/page';
import { LicenseEvent } from '../../../events/license.event';
import { OrganizationEvent } from '../../../events/organization.event';
import { SortEvent } from '../../../events/sort.event';
import { Operation } from '../../../models/operation';
import { SearchService } from '../../../services/search.service';
import { SortingService } from '../../../services/sorting.service';
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

  private readonly busySubject = new Subject<boolean>();

  constructor(private readonly apiConnector: ApiConnector,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService,
    private readonly sortingService: SortingService<Organization>) {
    super();
  }

  onActivate(component: ViewComponent) {
    if (component instanceof OrganizationListComponent) {
      component.searchCriteria = {};
      component.page = { request: {} };
      this.readOrganizations(component);
      this.subscribeToEvents(component);
    } else if (component instanceof OrganizationViewComponent) {
      this.setTitle(component);
      this.readOrganization(component);
      this.subscribeToEvents(component);
    }
  }

  private readOrganizations(component: OrganizationListComponent): void {
    const searchCriteria = this.searchService.parseCriteria(component.searchCriteria);
    const pageRequest = this.searchService.parsePage(component.page);
    this.busySubject.next(true);
    this.apiConnector.readOrganizations(searchCriteria, pageRequest).pipe(take(1), tap(page => this.onRead(component, page)), finalize(() => this.busySubject.next(false))).subscribe();
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
    this.busySubject.next(true);
    return obs$.pipe(take(1),
      tap(() => {
        event.closeElement?.click();
        this.router.navigate(['/organizations']);
      }),
      finalize(() => this.busySubject.next(false)));
  }

  private subscribeToEvents(component: ViewComponent) {
    if (component instanceof OrganizationListComponent || component instanceof OrganizationViewComponent) {
      this.busySubject.pipe(takeUntil(this.destroy$), tap(busy => component.busy = busy)).subscribe();
    }
    if (component instanceof OrganizationListComponent) {
      component.manage.pipe(takeUntil(this.destroy$), switchMap(event => this.writeOrganization(event)), tap(() => this.readOrganizations(component))).subscribe();
      component.search.pipe(takeUntil(this.destroy$), debounceTime(1000), tap(_ => this.readOrganizations(component))).subscribe();
      component.pageChange.pipe(takeUntil(this.destroy$), debounceTime(1000), tap(_ => this.readOrganizations(component))).subscribe();
      component.sort.pipe(takeUntil(this.destroy$), tap(event => this.onSort(component, event))).subscribe();
    } else if (component instanceof OrganizationViewComponent) {
      component.manage.pipe(takeUntil(this.destroy$), switchMap(event => this.writeOrganization(event))).subscribe();
      component.loadLicenses.pipe(takeUntil(this.destroy$), switchMap(uri => this.readLicenses(uri, component))).subscribe();
      component.writeLicense.pipe(takeUntil(this.destroy$), switchMap(event => this.writeLicense(event, component))).subscribe();
    }
  }

  private readLicenses(uri: string, component: OrganizationViewComponent): Observable<License[]> {
    this.busySubject.next(true);
    return this.apiConnector.readLicenses(uri).pipe(take(1), tap(licenses => component.licenses = licenses), finalize(() => this.busySubject.next(false)));
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
    this.busySubject.next(true);
    return obs$.pipe(take(1),
      switchMap(() => this.readLicenses(event.organization._links.licenses.href, component)),
      tap(() => {
        event.closeElement.click();
        component.licenseListComponent.selectedLicense = undefined;
      }), finalize(() => this.busySubject.next(false)));
  }

  private onRead(component: OrganizationListComponent, page: Page<OrganizationListWrapper>): void {
    component.entities = page?._embedded?.organizationDtoList;
    component.page.request.pageNumber = page.number + 1;
    component.page.request.pageSize = page.size;
    component.page.totalPages = page.totalPages;
    component.page.numberOfElements = page.numberOfElements;
    component.page.totalElements = page.totalElements;

    const sortEvent = this.getSortEvent(component);
    if (sortEvent) {
      this.onSort(component, sortEvent);
    }
  }

  private onSort(component: OrganizationListComponent, event: SortEvent): void {
    if (!event) {
      return;
    }

    const { attribute, direction } = event;

    component.headers.forEach(header => {
      if (header.sortable !== attribute) {
        header.direction = '';
      }
    });
    component.entities = this.sortingService.sort(component.entities, attribute, direction);
  }

  private getSortEvent(component: OrganizationListComponent): SortEvent {
    for (let i = 0; i < component.headers.length; i++) {
      const header = component.headers.get(i);
      if (header.direction !== '') {
        return { attribute: header.sortable, direction: header.direction };
      }
    }
    return null;
  }
}
