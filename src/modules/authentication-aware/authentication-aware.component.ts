import { Component, Input } from '@angular/core';
import { UserProfile } from '../../models/user-profile';
import { BaseComponent } from '../../views/base.component';

@Component({
    template: '',
    standalone: false
})
export abstract class AuthenticationAwareComponent extends BaseComponent {
	@Input() userProfile: UserProfile;
	@Input() isLoginPage: boolean;
}