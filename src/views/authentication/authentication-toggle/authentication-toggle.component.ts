import { Component } from '@angular/core';
import { AuthenticationAwareComponent } from '../../../modules/authentication-aware/authentication-aware.component';

@Component({
	selector: 'app-authentication-toggle',
	templateUrl: './authentication-toggle.component.html',
})
export class AuthenticationToggleComponent extends AuthenticationAwareComponent {
}
