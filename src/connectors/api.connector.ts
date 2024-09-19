import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, map, of } from 'rxjs';
import { OrganizationCollectionModel } from '../models/organization-collection.model';
import { Organization } from '../models/organization';
import { environment } from '../environments/environment';
import { License } from '../models/license';
import { LicenseCollectionModel } from '../models/license-collection.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConnector {

  private readonly url = environment.apiConnectorUrl;
  private readonly organizationEndpoint = `${this.url}/v1/organization`;
  private readonly notificationEndpoint = `${this.url}/v1/notification`;

  constructor(private readonly httpClient: HttpClient, private readonly oAuthService: OAuthService) { }

  private getOptions() {
    return {
      headers: {
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`
      }
    }
  }

  subscribeToNotifications(subscription: PushSubscriptionJSON): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.notificationEndpoint}/subscribe`, subscription, this.getOptions());
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.post<Organization>(this.organizationEndpoint, organization, this.getOptions());
  }

  readOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<OrganizationCollectionModel>(this.organizationEndpoint, this.getOptions()).pipe(map(m => m?._embedded?.organizationDtoList));
  }

  readOrganization(uri: string): Observable<Organization> {
    return uri ? this.httpClient.get<Organization>(uri, this.getOptions()) : of(null);
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.put<Organization>(organization._links.update.href, organization, this.getOptions());
  }

  delete(url: string): Observable<void> {
    return this.httpClient.delete<void>(url, this.getOptions());
  }

  // TODO: Deprecate this method in favor of delete
  deleteOrganization(url: string): Observable<void> {
    return this.httpClient.delete<void>(url, this.getOptions());
  }

  createLicense(license: License, uri: string): Observable<License> {
    return this.httpClient.post<License>(uri, license, this.getOptions());
  }

  readLicenses(uri: string): Observable<License[]> {
    return this.httpClient.get<LicenseCollectionModel>(uri, this.getOptions()).pipe(map(m => m?._embedded?.licenseDtoList));
  }

  readLicense(uri: string): Observable<License> {
    return uri ? this.httpClient.get<License>(uri, this.getOptions()) : of(null);
  }

  updateLicense(license: License): Observable<License> {
    return this.httpClient.put<License>(license._links.update.href, license, this.getOptions());
  }

}
