import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export abstract class ApiConnector {
  private readonly url = environment.apiConnectorUrl;

  constructor(
    protected readonly oAuthService: OAuthService,
    protected readonly httpClient: HttpClient,
  ) {}

  protected getOptions(params?: any) {
    return {
      headers: {
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
      },
      params,
    };
  }

  protected getUrl(): string {
    return this.url;
  }
}
