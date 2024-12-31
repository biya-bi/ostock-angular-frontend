import { Component } from '@angular/core';
import { AuthenticationAwareComponent } from '../../authentication-aware/authentication-aware.component';

@Component({
    selector: 'app-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    standalone: false
})
export class NavigationMenuComponent extends AuthenticationAwareComponent {
}
