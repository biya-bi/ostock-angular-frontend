import { Component } from '@angular/core';
import { AuthenticationAwareComponent } from '../../modules/authentication-aware/authentication-aware.component';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrl: './authentication.component.css'
})
export class AuthenticationComponent extends AuthenticationAwareComponent {
}
