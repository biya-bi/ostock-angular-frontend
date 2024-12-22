import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { LicenseContext } from '../../../contexts/license.context';
import { OrganizationContext } from '../../../contexts/organization.context';
import { LicenseSearchCriteria } from '../../../criteria/license-search-criteria';
import { OrganizationSearchCriteria } from '../../../criteria/organization-search-criteria';
import { LicenseListWrapper } from '../../../dtos/license-list-wrapper';
import { Organization } from '../../../dtos/organization';
import { OrganizationListWrapper } from '../../../dtos/organization-list-wrapper';
import { Page } from '../../../dtos/page';
import { LicenseEvent } from '../../../events/license.event';
import { SearchEvent } from '../../../events/search.event';
import { Operation } from '../../../models/operation';
import { PageRequest } from '../../../models/page-request';
import { LicenseService } from '../../../services/license.service';
import { OrganizationService } from '../../../services/organization.service';
import { SearchService } from '../../../services/search.service';
import { SortingService } from '../../../services/sorting.service';
import { PageUtil } from '../../../util/PageUtil';
import { EntityContainer } from '../../../views/entity.container';
import { OrganizationViewComponent } from '../organization-view.component';

@Component({
    selector: 'app-organization-container',
    templateUrl: './organization.container.html',
    styleUrl: './organization.container.css',
    standalone: false
})
export class OrganizationContainer extends EntityContainer<OrganizationContext, SearchEvent<OrganizationSearchCriteria>> {

    constructor(
        protected override readonly router: Router,
        protected override readonly activatedRoute: ActivatedRoute,
        protected override readonly searchService: SearchService,
        protected override readonly sortingService: SortingService<Organization>,
        protected override readonly entityService: OrganizationService,
        private readonly licenseService: LicenseService) {
        super(router, activatedRoute, searchService, sortingService, entityService);
    }

    protected override retrieveEntities(page: Page<OrganizationListWrapper>): Organization[] {
        return page?._embedded?.organizationDtoList;
    }

    protected override getEntityListPath(): string {
        return '/organizations';
    }

    protected override subscribeToEntityViewEvents(component: OrganizationViewComponent): void {
        super.subscribeToEntityViewEvents(component);
        component.writeLicense.pipe(
            takeUntil(this.destroy$),
            filter(event => event.operation === Operation.Delete),
            switchMap(event => this.deleteLicense(event)))
            .subscribe();
        component.licensePageChange.pipe(
            takeUntil(component.destroy$),
            debounceTime(1000),
            switchMap((pageNumber) => this.onLicensePageChange(pageNumber)))
            .subscribe();
        component.searchLicenses.pipe(
            takeUntil(component.destroy$),
            debounceTime(1000),
            switchMap(event => this.readLicenses(event.uri, event.pageRequest, event.searchCriteria)))
            .subscribe();
    }

    protected override getContext(): OrganizationContext {
        const context = super.getContext();
        const licenseContext = this.getLicensecontext(context);
        context.licenseContext = licenseContext;
        return context;
    }

    private readLicenses(uri?: string, pageRequest?: PageRequest, searchCriteria?: LicenseSearchCriteria): Observable<Page<LicenseListWrapper>> {
        const context = this.getContext();
        const licenseContext = this.getLicensecontext(context);
        if (!uri) {
            uri = context.selectedEntity?._links.licenses.href;
        }
        if (!pageRequest) {
            pageRequest = licenseContext.pagination.request;
        }
        if (!searchCriteria) {
            searchCriteria = licenseContext.searchCriteria;
        }
        const obs$ = this.licenseService.read({ searchCriteria, pageRequest }, uri);
        return this.run(obs$).pipe(
            take(1),
            tap((page: Page<LicenseListWrapper>) => {
                const licenses = page?._embedded?.licenseDtoList;
                licenseContext.entities = licenses;
                licenseContext.pagination = PageUtil.getPagination(page);
                this.entityContext.set({ ...context, licenseContext });
            }));
    }

    private deleteLicense(event: LicenseEvent): Observable<Page<LicenseListWrapper>> {
        const obs$: Observable<void> = this.licenseService.delete(event.entity._links.delete.href);
        return this.run(obs$).pipe(take(1), switchMap(() => this.readLicenses()), tap(() => event.closeElement.click()));
    }

    private getLicensecontext(context: OrganizationContext): LicenseContext {
        let licenseContext = context.licenseContext;
        if (!licenseContext) {
            licenseContext = { organizations: [], entities: [], pagination: {}, searchCriteria: {} };
        }
        return licenseContext;
    }

    private onLicensePageChange(pageNumber: number): Observable<Page<LicenseListWrapper>> {
        const context = this.getContext();
        const uri = context.selectedEntity._links.licenses.href;
        let pageRequest = context.licenseContext.pagination?.request;
        if (!pageRequest) {
            pageRequest = {};
        }
        pageRequest.pageNumber = pageNumber;
        return this.readLicenses(uri, pageRequest);
    }
}