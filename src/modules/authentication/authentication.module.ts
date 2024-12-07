import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationContainer } from './authentication-container/authentication.container';
import { AuthenticationToggleComponent } from './authentication-toggle/authentication-toggle.component';

@NgModule({
	declarations: [
		AuthenticationToggleComponent,
		AuthenticationContainer
	],
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule,
		NgbModule,
	],
	exports: [
		AuthenticationContainer,
	],
})
export class AuthenticationModule { }