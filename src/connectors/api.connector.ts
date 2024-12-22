import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { LicenseSearchCriteria } from '../criteria/license-search-criteria';
import { OrganizationSearchCriteria } from '../criteria/organization-search-criteria';
import { License } from '../dtos/license';
import { LicenseListWrapper } from '../dtos/license-list-wrapper';
import { Organization } from '../dtos/organization';
import { OrganizationListWrapper } from '../dtos/organization-list-wrapper';
import { Page } from '../dtos/page';
import { environment } from '../environments/environment';
import { PageRequest } from '../models/page-request';

@Injectable({
  providedIn: 'root'
})
export class ApiConnector {

  private readonly url = environment.apiConnectorUrl;
  private readonly organizationEndpoint = `${this.url}/v1/organization`;
  private readonly notificationEndpoint = `${this.url}/v1/notification`;
  private readonly licenseEndpoint = `${this.url}/v1/license`;

  constructor(private readonly httpClient: HttpClient, private readonly oAuthService: OAuthService) { }

  private getOptions(params?: any) {
    return {
      headers: {
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`
      },
      params
    }
  }

  subscribeToNotifications(subscription: PushSubscriptionJSON): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.notificationEndpoint}/subscribe`, subscription, this.getOptions());
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.post<Organization>(this.organizationEndpoint, organization, this.getOptions());
  }

  readOrganizations(searchCriteria: OrganizationSearchCriteria, pageRequest: PageRequest): Observable<Page<OrganizationListWrapper>> {
    return this.httpClient.post<Page<OrganizationListWrapper>>(`${this.organizationEndpoint}/search`, searchCriteria, this.getOptions(pageRequest));
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

  createLicense(license: License, uri: string): Observable<License> {
    return this.httpClient.post<License>(uri, license, this.getOptions());
  }

  readLicensesByUri(uri: string, pageRequest: PageRequest): Observable<Page<LicenseListWrapper>> {
    return this.httpClient.post<Page<LicenseListWrapper>>(uri, {}, this.getOptions(pageRequest));
  }

  readLicense(uri: string): Observable<License> {
    return uri ? this.httpClient.get<License>(uri, this.getOptions()) : of(null);
  }

  updateLicense(license: License): Observable<License> {
    return this.httpClient.put<License>(license._links.update.href, license, this.getOptions());
  }

  readLicenses(searchCriteria: LicenseSearchCriteria, pageRequest: PageRequest, uri?: string): Observable<Page<LicenseListWrapper>> {
    const endpoint = uri || `${this.licenseEndpoint}/search`;
    return this.httpClient.post<Page<LicenseListWrapper>>(endpoint, searchCriteria, this.getOptions(pageRequest));
  }

}
