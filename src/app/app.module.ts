import { CommonModule } from "@angular/common";
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { OAuthModule } from "angular-oauth2-oidc";
import { environment } from "../environments/environment";
import { AuthenticationModule } from "../modules/authentication/authentication.module";
import { LicenseModule } from "../modules/license/license.module";
import { LocaleModule } from "../modules/locale/locale.module";
import { NavigationModule } from "../modules/navigation/navigation.module";
import { OrganizationModule } from "../modules/organization/organization.module";
import { HomeComponent } from "../views/home/home.component";
import { NotificationContainer } from "../views/notification/notification.container";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotificationContainer,
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
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
        LocaleModule,
        NavigationModule,
        AuthenticationModule,
        OrganizationModule,
		LicenseModule,
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }