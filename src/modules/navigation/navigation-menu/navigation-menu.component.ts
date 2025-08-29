import { Component, Input } from '@angular/core';
import { AuthenticationAwareComponent } from '../../authentication-aware/authentication-aware.component';
import { DeviceType } from '../../../models/breakpoints';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  standalone: false,
})
export class NavigationMenuComponent extends AuthenticationAwareComponent {
  @Input() deviceType: DeviceType;
}
