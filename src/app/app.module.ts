import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { OAuthModule } from "angular-oauth2-oidc";
import { NgbdSortableHeader } from "../directives/sortable.directive";
import { environment } from "../environments/environment";
import { LocaleModule } from "../modules/locale/locale.module";
import { AuthenticationComponent } from "../views/authentication/authentication.component";
import { BannerComponent } from "../views/banner/banner.component";
import { HomeComponent } from "../views/home/home.component";
import { LicenseDeleteComponent } from "../views/licenses/license-delete/license-delete.component";
import { LicenseDetailsComponent } from "../views/licenses/license-details/license-details.component";
import { LicenseListComponent } from "../views/licenses/license-list/license-list.component";
import { LicenseWriteComponent } from "../views/licenses/license-write/license-write.component";
import { LoginComponent } from "../views/login/login.component";
import { LogOutComponent } from "../views/logout/logout.component";
import { NotificationContainer } from "../views/notification/notification.container";
import { OrganizationContainer } from "../views/organizations/organization-container/organization.container";
import { OrganizationDeleteComponent } from "../views/organizations/organization-delete/organization-delete.component";
import { OrganizationDetailsComponent } from "../views/organizations/organization-details/organization-details.component";
import { OrganizationListComponent } from "../views/organizations/organization-list/organization-list.component";
import { OrganizationWriteComponent } from "../views/organizations/organization-write/organization-write.component";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";

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
        }),
        FormsModule,
        NgbModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
                deps: [HttpClient]
            }
        }),
        LocaleModule
    ],
    declarations: [
        AppComponent,
        AuthenticationComponent,
        BannerComponent,
        HomeComponent,
        LoginComponent,
        LogOutComponent,
        OrganizationContainer,
        OrganizationDeleteComponent,
        OrganizationDetailsComponent,
        OrganizationListComponent,
        OrganizationWriteComponent,
        NotificationContainer,
        LicenseDeleteComponent,
        LicenseDetailsComponent,
        LicenseListComponent,
        LicenseWriteComponent,
        NgbdSortableHeader,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }