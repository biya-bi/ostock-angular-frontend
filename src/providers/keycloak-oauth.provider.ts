import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakOAuthProvider extends AbstractOAuthProvider {

  constructor(protected override readonly oAuthService: OAuthService) {
    super(oAuthService);
  }

  protected override getAuthConfig(): AuthConfig {
    return {
      issuer: environment.keycloakConfig.issuer,
      strictDiscoveryDocumentValidation: false,
      redirectUri: document.location.origin,
      clientId: 'ostock',
      scope: 'openid profile email',
      requireHttps: environment.keycloakConfig.requireHttps,
      loginUrl: environment.keycloakConfig.issuer,
      logoutUrl: document.location.origin + '/logout'
    };
  }

}
