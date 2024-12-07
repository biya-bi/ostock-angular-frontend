import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';
import { AuthenticationManager } from '../../../managers/authentication.manager';
import { AuthenticationAwareComponent } from '../../authentication-aware/authentication-aware.component';

@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent extends AuthenticationAwareComponent {
}
