import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, ReplaySubject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { LicenseContext } from '../../../contexts/license.context';
import { LicenseSearchCriteria } from '../../../criteria/license-search-criteria';
import { License } from '../../../dtos/license';
import { LicenseLinks } from '../../../dtos/license-links';
import { LicenseListWrapper } from '../../../dtos/license-list-wrapper';
import { Organization } from '../../../dtos/organization';
import { Page } from '../../../dtos/page';
import { LicenseEvent } from '../../../events/license.event';
import { SearchEvent } from '../../../events/search.event';
import { Operation } from '../../../models/operation';
import { LicenseService } from '../../../services/license.service';
import { OrganizationService } from '../../../services/organization.service';
import { SearchService } from '../../../services/search.service';
import { SortingService } from '../../../services/sorting.service';
import { EntityViewComponent } from '../../../views/entity-view.component';
import { EntityContainer } from '../../../views/entity.container';
import { LicenseWriteComponent } from '../license-write/license-write.component';

@Component({
	selector: 'app-license-container',
	templateUrl: './license.container.html',
	standalone: false
})
export class LicenseContainer extends EntityContainer<LicenseLinks, License, LicenseEvent, LicenseSearchCriteria, LicenseListWrapper, LicenseContext> {

	private readonly organizationSelectedSubject = new ReplaySubject<Organization>(1);

	constructor(
		protected override readonly router: Router,
		protected override readonly activatedRoute: ActivatedRoute,
		protected override readonly searchService: SearchService,
		protected override readonly sortingService: SortingService<License>,
		private readonly apiConnector: ApiConnector,
		private readonly licenseService: LicenseService,
		private readonly organizationService: OrganizationService) {
		super(router, activatedRoute, searchService, sortingService);
	}

	protected override createEntity(entity: License): Observable<License> {
		return this.organizationSelectedSubject.pipe(take(1), switchMap(organization => this.apiConnector.createLicense(entity, organization._links.addLicense.href)));
	}

	protected override updateEntity(entity: License): Observable<License> {
		return this.apiConnector.updateLicense(entity);
	}

	protected override deleteEntity(uri: string): Observable<void> {
		return this.apiConnector.delete(uri);
	}

	protected override getEntity(uri: string): Observable<License> {
		return this.apiConnector.readLicense(uri);
	}

	protected override getEntities(searchEvent: SearchEvent<LicenseSearchCriteria>): Observable<Page<LicenseListWrapper>> {
		return this.licenseService.read(searchEvent);
	}

	protected override retrieveEntities(page: Page<LicenseListWrapper>): License[] {
		return page._embedded?.licenseDtoList;
	}

	protected override getEntityListPath(): string {
		return '/licenses';
	}

	private initOrganizations(): Observable<Organization[]> {
		const obs$ = this.organizationService.read({}); // TODO: Improve this
		return this.run(obs$).pipe(map(page => page._embedded?.organizationDtoList), tap(organizations => {
			const context = this.getContext();
			this.entityContext.set({ ...context, organizations });
		}));
	}

	protected override subscribeToEntityViewEvents(component: EntityViewComponent<License, LicenseEvent, LicenseSearchCriteria, LicenseContext>): void {
		super.subscribeToEntityViewEvents(component);
		if (component instanceof LicenseWriteComponent && this.isOperation(Operation.Create)) {
			component.organizationSelected.pipe(takeUntil(this.destroy$), tap(organization => this.organizationSelectedSubject.next(organization))).subscribe();
			this.initOrganizations().pipe(takeUntil(this.destroy$)).subscribe();
		}
	}

	protected override getEntityContextSignal(): WritableSignal<LicenseContext> {
		return signal({ entities: [], pagination: {}, searchCriteria: {}, organizations: [] });
	}

	protected override onReadEntity(entity: License): Observable<License> {
		return this.apiConnector.readOrganization(entity._links.organization.href).pipe(take(1),
			tap(organization => {
				this.organizationSelectedSubject.next(organization);
				const context = this.getContext();
				context.selectedOrganization = organization;
			}), map(() => entity));
	}
}