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
    const loginUrl = this.getLoginUrl();
    const logoutUrl = this.getLogoutUrl();

    const config = environment.keycloakConfig;

    config.loginUrl = loginUrl;
    config.logoutUrl = logoutUrl;
    config.postLogoutRedirectUri = logoutUrl;

    return config;
  }

  private getLoginUrl(): string {
    const url = new URL(environment.keycloakConfig.issuer);
    const params = url.searchParams;
    params.set('kc_locale', this.localeService.getLocale());
    return url.href;
  }

}
