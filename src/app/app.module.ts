import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ServiceWorkerModule } from '@angular/service-worker';
import { OAuthModule } from "angular-oauth2-oidc";
import { environment } from "../environments/environment";
import { AuthenticationComponent } from "../views/authentication/authentication.component";
import { BannerComponent } from "../views/banner/banner.component";
import { HomeComponent } from "../views/home/home.component";
import { LicenseContainer } from "../views/licenses/license-container/license.container";
import { LoginComponent } from "../views/login/login.component";
import { NotificationContainer } from "../views/notification/notification.container";
import { OrganizationContainer } from "../views/organizations/organization-container/organization.container";
import { OrganizationDeleteComponent } from "../views/organizations/organization-delete/organization-delete.component";
import { OrganizationDetailsComponent } from "../views/organizations/organization-details/organization-details.component";
import { OrganizationListComponent } from "../views/organizations/organization-list/organization-list.component";
import { OrganizationAddComponent } from "../views/organizations/organization-write/organization-add.component";
import { OrganizationEditComponent } from "../views/organizations/organization-write/organization-edit.component";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { LicenseDeleteComponent } from "../views/licenses/license-delete/license-delete.component";
import { LicenseAddComponent } from "../views/licenses/license-write/license-add.component";
import { LicenseListComponent } from "../views/licenses/license-list/license-list.component";
import { LicenseEditComponent } from "../views/licenses/license-write/license-edit.component";
import { LicenseDetailsComponent } from "../views/licenses/license-details/license-details.component";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        ReactiveFormsModule,
        RouterOutlet,
        RouterModule.forRoot(routes),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    declarations: [
        AppComponent,
        AuthenticationComponent,
        BannerComponent,
        HomeComponent,
        LoginComponent,
        OrganizationAddComponent,
        OrganizationContainer,
        OrganizationDeleteComponent,
        OrganizationDetailsComponent,
        OrganizationEditComponent,
        OrganizationListComponent,
        NotificationContainer,
        LicenseAddComponent,
        LicenseContainer,
        LicenseDeleteComponent,
        LicenseDetailsComponent,
        LicenseEditComponent,
        LicenseListComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }