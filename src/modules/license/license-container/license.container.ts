import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take, takeUntil, tap } from 'rxjs';
import { LicenseContext } from '../../../contexts/license.context';
import { License } from '../../../dtos/license';
import { LicenseListWrapper } from '../../../dtos/license-list-wrapper';
import { Organization } from '../../../dtos/organization';
import { OrganizationListWrapper } from '../../../dtos/organization-list-wrapper';
import { Page } from '../../../dtos/page';
import { LicenseSearchEvent } from '../../../events/license-search.event';
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
export class LicenseContainer extends EntityContainer<LicenseContext, LicenseSearchEvent> {

	constructor(
		protected override readonly router: Router,
		protected override readonly activatedRoute: ActivatedRoute,
		protected override readonly searchService: SearchService,
		protected override readonly sortingService: SortingService<License>,
		protected override readonly entityService: LicenseService,
		private readonly organizationService: OrganizationService) {
		super(router, activatedRoute, searchService, sortingService, entityService);
	}

	protected override retrieveEntities(page: Page<LicenseListWrapper>): License[] {
		return page._embedded?.licenseDtoList;
	}

	protected override getEntityListPath(): string {
		return '/licenses';
	}

	private initOrganizations(): Observable<Organization[]> {
		const obs$ = this.organizationService.read({}); // TODO: Improve this
		return this.run(obs$).pipe(
			map((page: Page<OrganizationListWrapper>) => page._embedded?.organizationDtoList),
			tap(organizations => {
				const context = this.getContext();
				this.entityContext.set({ ...context, organizations });
			}));
	}

	protected override subscribeToEntityViewEvents(component: EntityViewComponent<License, LicenseContext>): void {
		super.subscribeToEntityViewEvents(component);
		if (component instanceof LicenseWriteComponent && this.isOperation(Operation.Create)) {
			this.initOrganizations().pipe(takeUntil(this.destroy$)).subscribe();
		}
	}

	protected override getEntityContextSignal(): WritableSignal<LicenseContext> {
		return signal({ entities: [], pagination: {}, searchCriteria: {}, organizations: [] });
	}

	protected override onReadEntity(entity: License): Observable<License> {
		return this.organizationService.readByUri(entity._links.organization.href).pipe(
			take(1),
			tap(organization => entity.organization = organization),
			map(() => entity));
	}
}