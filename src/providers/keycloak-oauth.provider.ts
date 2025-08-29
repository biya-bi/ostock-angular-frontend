import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';
import { environment } from '../environments/environment';
import { LocaleService } from '../services/locale.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakOAuthProvider extends AbstractOAuthProvider {

  constructor(protected override readonly oAuthService: OAuthService, protected override readonly localeService: LocaleService) {
    super(oAuthService, localeService);
  }

  protected override getAuthConfig(): AuthConfig {
    return {
      issuer: environment.keycloakConfig.issuer,
      strictDiscoveryDocumentValidation: false,
      redirectUri: document.location.origin,
      clientId: 'ostock',
      scope: 'openid profile email',
      requireHttps: environment.keycloakConfig.requireHttps,
      loginUrl: this.getLoginUrl(),
      logoutUrl: document.location.origin + '/logout'
    };
  }

  private getLoginUrl(): string {
    const url = new URL(environment.keycloakConfig.issuer);
    const params = url.searchParams;
    params.set('kc_locale', this.localeService.getLocale());
    return url.href;
  }

}
