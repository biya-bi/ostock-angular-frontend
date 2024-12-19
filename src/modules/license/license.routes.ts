import { Routes } from '@angular/router';
import { authenticationGuard } from '../../guards/authentication.guard';
import { LicenseContainer } from './license-container/license.container';
import { LicenseDetailsComponent } from './license-details/license-details.component';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseWriteComponent } from './license-write/license-write.component';

export const LICENSE_ROUTES: Routes = [
	{
		path: 'licenses',
		component: LicenseContainer,
		canActivate: [authenticationGuard],
		children: [
			{
				path: '',
				component: LicenseListComponent
			},
			{
				path: 'add',
				component: LicenseWriteComponent
			},
			{
				path: 'details',
				component: LicenseDetailsComponent
			},
			{
				path: 'edit',
				component: LicenseWriteComponent
			},
		]
	},
];
