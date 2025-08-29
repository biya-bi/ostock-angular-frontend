import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';
import { LocaleService } from '../services/locale.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleOAuthProvider extends AbstractOAuthProvider {

  constructor(protected override readonly oAuthService: OAuthService, protected override readonly localeService: LocaleService) {
    super(oAuthService, localeService);
  }

  protected override getAuthConfig(): AuthConfig {
    return {
      issuer: "https://accounts.google.com",
      strictDiscoveryDocumentValidation: false,
      redirectUri: document.location.origin,
      clientId: '479603210590-tg2941ec6ivracsia1sv2bf93di5b3rp.apps.googleusercontent.com',
      scope: 'openid profile email',
    };
  }

  protected override getInitFlowParams(): {} {
    return { prompt: 'select_account' };
  }

}
