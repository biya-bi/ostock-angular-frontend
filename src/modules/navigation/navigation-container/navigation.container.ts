import { Component } from "@angular/core";
import { AuthenticationAwareContainer } from "../../authentication-aware/authentication-aware.container";
import { AuthenticationManager } from "../../../managers/authentication.manager";
import { Router } from "@angular/router";

@Component({
	selector: 'app-navigation-container',
	templateUrl: './navigation.container.html'
})
export class NavigationContainer extends AuthenticationAwareContainer {
	constructor(
		protected override readonly authenticationManager: AuthenticationManager,
		protected override readonly router: Router) {
		super(authenticationManager, router);
	}
}