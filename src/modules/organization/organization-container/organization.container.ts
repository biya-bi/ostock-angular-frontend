import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { OrganizationContext } from '../../../contexts/organization.context';
import { OrganizationSearchCriteria } from '../../../criteria/organization-search-criteria';
import { LicenseListWrapper } from '../../../dtos/license-list-wrapper';
import { Organization } from '../../../dtos/organization';
import { OrganizationLinks } from '../../../dtos/organization-links';
import { OrganizationListWrapper } from '../../../dtos/organization-list-wrapper';
import { Page } from '../../../dtos/page';
import { LicenseEvent } from '../../../events/license.event';
import { OrganizationEvent } from '../../../events/organization.event';
import { SearchEvent } from '../../../events/search.event';
import { Operation } from '../../../models/operation';
import { OrganizationService } from '../../../services/organization.service';
import { SearchService } from '../../../services/search.service';
import { SortingService } from '../../../services/sorting.service';
import { EntityContainer } from '../../../views/entity.container';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-container',
    templateUrl: './organization.container.html',
    styleUrl: './organization.container.css',
    standalone: false
})
export class OrganizationContainer extends EntityContainer<OrganizationLinks, Organization, OrganizationEvent, OrganizationSearchCriteria, OrganizationListWrapper, OrganizationContext> {

    constructor(
        protected override readonly router: Router,
        protected override readonly activatedRoute: ActivatedRoute,
        protected override readonly searchService: SearchService,
        protected override readonly sortingService: SortingService<Organization>,
        private readonly apiConnector: ApiConnector,
        private readonly organizationService: OrganizationService) {
        super(router, activatedRoute, searchService, sortingService);
    }

    protected override createEntity(entity: Organization): Observable<Organization> {
        return this.apiConnector.createOrganization(entity);
    }

    protected override updateEntity(entity: Organization): Observable<Organization> {
        return this.apiConnector.updateOrganization(entity);
    }

    protected override deleteEntity(uri: string): Observable<void> {
        return this.apiConnector.delete(uri);
    }

    protected override getEntity(uri: string): Observable<Organization> {
        return this.apiConnector.readOrganization(uri);
    }

    protected override getEntities(searchEvent: SearchEvent<OrganizationSearchCriteria>): Observable<Page<OrganizationListWrapper>> {
        return this.organizationService.read(searchEvent);
    }

    protected override retrieveEntities(page: Page<OrganizationListWrapper>): Organization[] {
        return page?._embedded?.organizationDtoList;
    }

    protected override getEntityListPath(): string {
        return '/organizations';
    }

    protected override subscribeToEntityViewEvents(component: OrganizationViewComponent): void {
        super.subscribeToEntityViewEvents(component);
        component.loadLicenses.pipe(takeUntil(this.destroy$), switchMap(uri => this.readLicenses(uri, component))).subscribe();
        component.writeLicense.pipe(takeUntil(this.destroy$), switchMap(event => this.writeLicense(event, component))).subscribe();
    }

    private readLicenses(uri: string, component: OrganizationViewComponent): Observable<Page<LicenseListWrapper>> {
        const pageRequest = { pageNumber: 0, pageSize: 100 }; // TODO: Replace this hard coded value.
        const obs$ = this.apiConnector.readLicensesByUri(uri, pageRequest);
        return this.run(obs$).pipe(take(1), tap(licenses => component.licenses = licenses?._embedded?.licenseDtoList));
    }

    private writeLicense(event: LicenseEvent, component: OrganizationViewComponent): Observable<Page<LicenseListWrapper>> {
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
        return this.run(obs$).pipe(take(1),
            switchMap(() => this.readLicenses(event.organization._links.licenses.href, component)),
            tap(() => event.closeElement.click()));
    }
}