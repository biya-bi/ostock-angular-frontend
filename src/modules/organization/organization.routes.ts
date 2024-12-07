import { Routes } from '@angular/router';
import { OrganizationContainer } from './organization-container/organization.container';
import { authenticationGuard } from '../../guards/authentication.guard';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationWriteComponent } from './organization-write/organization-write.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';

export const ORGANIZATION_ROUTES: Routes = [
	{
		path: 'organizations',
		component: OrganizationContainer,
		canActivate: [authenticationGuard],
		children: [
			{
				path: '',
				component: OrganizationListComponent
			},
			{
				path: 'add',
				component: OrganizationWriteComponent
			},
			{
				path: 'details',
				component: OrganizationDetailsComponent
			},
			{
				path: 'edit',
				component: OrganizationWriteComponent
			},
		]
	},
];
