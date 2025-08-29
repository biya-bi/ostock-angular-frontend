import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';
import { LocaleService } from '../services/locale.service';
import { environment } from '../environments/environment';
import { OAuthProviderType } from '../models/oauth-provider-type';

@Injectable({
  providedIn: 'root',
})
export class GoogleOAuthProvider extends AbstractOAuthProvider {
  constructor(
    protected override readonly oAuthService: OAuthService,
    protected override readonly localeService: LocaleService,
  ) {
    super(oAuthService, localeService);
  }

  protected override getAuthConfig(): AuthConfig {
    return environment.oAuthProviders[OAuthProviderType.google];
  }

  protected override getInitFlowParams(): {} {
    return { prompt: 'select_account' };
  }
}
