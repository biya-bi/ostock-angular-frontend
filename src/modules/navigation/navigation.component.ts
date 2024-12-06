import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';
import { AuthenticationManager } from '../../managers/authentication.manager';
import { BaseComponent } from '../../views/base.component';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.css'
})
export class NavigationComponent extends BaseComponent {

	private readonly url$ = this.router.events.pipe(takeUntil(this.destroy$), filter(e => e instanceof NavigationEnd), map((e: NavigationEnd) => e.url));

	readonly userProfile$ = this.authenticationManager.userProfile$;
	readonly isLoginPage$ = this.url$.pipe(takeUntil(this.destroy$), map(url => url === '/login'));

	constructor(
		private readonly authenticationManager: AuthenticationManager,
		private readonly router: Router) {
		super();
	}

}
