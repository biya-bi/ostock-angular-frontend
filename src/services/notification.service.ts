import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, from, of, switchMap } from 'rxjs';
import { NotificationConnector } from '../connectors/notifcation.connector';
import { environment } from '../environments/environment';
import { AuthenticationManager } from '../managers/authentication.manager';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly subscriptionRequest$: Observable<boolean>;

  constructor(
    private readonly swPush: SwPush,
    private readonly connector: NotificationConnector,
    private readonly authenticationManager: AuthenticationManager,
  ) {
    this.subscriptionRequest$ = this.authenticationManager.userProfile$.pipe(
      switchMap((userProfile) =>
        userProfile ? this.requestSubscription() : of(undefined),
      ),
    );
  }

  private requestSubscription(): Observable<boolean> {
    if (!environment.production) {
      return of(null);
    }
    return from(
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapidPublicKey,
      }),
    ).pipe(
      switchMap((subscription) =>
        this.connector.subscribe(subscription.toJSON()),
      ),
    );
  }
}
