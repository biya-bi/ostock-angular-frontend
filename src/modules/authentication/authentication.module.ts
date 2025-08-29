import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationContainer } from './authentication-container/authentication.container';
import { AuthenticationToggleComponent } from './authentication-toggle/authentication-toggle.component';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './logout/logout.component';
import { AUTHENTICATION_ROUTES } from './authentication.routes';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NgbModule,
    RouterModule.forChild(AUTHENTICATION_ROUTES),
  ],
  declarations: [
    AuthenticationToggleComponent,
    AuthenticationContainer,
    LoginComponent,
    LogOutComponent,
  ],
  exports: [AuthenticationContainer],
})
export class AuthenticationModule {}
