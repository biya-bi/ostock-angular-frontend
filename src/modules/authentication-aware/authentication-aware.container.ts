import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';
import { AuthenticationManager } from '../../managers/authentication.manager';
import { BaseComponent } from '../../views/base.component';

export abstract class AuthenticationAwareContainer extends BaseComponent {
	private readonly url$ = this.router.events.pipe(takeUntil(this.destroy$), filter(e => e instanceof NavigationEnd), map((e: NavigationEnd) => e.url));

	readonly userProfile$ = this.authenticationManager.userProfile$;
	readonly isLoginPage$ = this.url$.pipe(takeUntil(this.destroy$), map(url => url === '/login'));

	constructor(
		protected readonly authenticationManager: AuthenticationManager,
		protected readonly router: Router) {
		super();
	}
}