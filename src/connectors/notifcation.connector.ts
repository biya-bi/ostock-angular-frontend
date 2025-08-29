import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { ApiConnector } from './api.connector';

@Injectable({
  providedIn: 'root',
})
export class NotificationConnector extends ApiConnector {
  private readonly notificationEndpoint = `${this.getUrl()}/v1/notification`;

  constructor(
    protected override readonly oAuthService: OAuthService,
    protected override readonly httpClient: HttpClient,
  ) {
    super(oAuthService, httpClient);
  }

  subscribe(subscription: PushSubscriptionJSON): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.notificationEndpoint}/subscribe`,
      subscription,
      this.getOptions(),
    );
  }
}
