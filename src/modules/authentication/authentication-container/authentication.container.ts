import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationManager } from '../../../managers/authentication.manager';
import { AuthenticationAwareContainer } from '../../authentication-aware/authentication-aware.container';

@Component({
    selector: 'app-authentication-container',
    templateUrl: './authentication.container.html',
    standalone: false
})
export class AuthenticationContainer extends AuthenticationAwareContainer {
	constructor(
		protected override readonly authenticationManager: AuthenticationManager,
		protected override readonly router: Router) {
		super(authenticationManager, router);
	}
}
