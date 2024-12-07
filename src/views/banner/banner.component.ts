import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthenticationManager } from '../../managers/authentication.manager';
import { AuthenticationAwareComponent } from '../../modules/authentication-aware/authentication-aware.component';
import { AuthenticationAwareContainer } from '../../modules/authentication-aware/authentication-aware.container';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.css'
})
export class BannerComponent extends AuthenticationAwareContainer {
	constructor(
		protected override readonly authenticationManager: AuthenticationManager,
		protected override readonly router: Router) {
		super(authenticationManager, router);
	}

}
