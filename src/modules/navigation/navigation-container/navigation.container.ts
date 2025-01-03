import { Component } from "@angular/core";
import { AuthenticationAwareContainer } from "../../authentication-aware/authentication-aware.container";
import { AuthenticationManager } from "../../../managers/authentication.manager";
import { Router } from "@angular/router";
import { BreakpointService } from "../../../services/breakpoint.service";

@Component({
	selector: 'app-navigation-container',
	templateUrl: './navigation.container.html',
	standalone: false
})
export class NavigationContainer extends AuthenticationAwareContainer {

	readonly deviceType$ = this.breakpointService.deviceType$;

	constructor(
		protected override readonly authenticationManager: AuthenticationManager,
		protected override readonly router: Router,
		private readonly breakpointService: BreakpointService) {
		super(authenticationManager, router);
	}
}