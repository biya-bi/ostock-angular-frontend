import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './logout/logout.component';

export const AUTHENTICATION_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogOutComponent },
];
