import { Component } from '@angular/core';
import { AuthenticationAwareComponent } from '../../authentication-aware/authentication-aware.component';

@Component({
    selector: 'app-authentication-toggle',
    templateUrl: './authentication-toggle.component.html',
    standalone: false
})
export class AuthenticationToggleComponent extends AuthenticationAwareComponent {
}
