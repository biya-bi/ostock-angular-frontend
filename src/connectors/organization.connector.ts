import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OrganizationSearchCriteria } from '../criteria/organization-search-criteria';
import { Organization } from '../dtos/organization';
import { OrganizationListWrapper } from '../dtos/organization-list-wrapper';
import { CrudConnector } from './crud.connector';

@Injectable({
  providedIn: 'root',
})
export class OrganizationConnector extends CrudConnector<
  Organization,
  OrganizationSearchCriteria,
  OrganizationListWrapper
> {
  private readonly organizationUrl = `${this.getUrl()}/v1/organization`;

  constructor(
    protected override readonly oAuthService: OAuthService,
    protected override readonly httpClient: HttpClient,
  ) {
    super(oAuthService, httpClient);
  }

  protected override getCreateUrl(): string {
    return this.organizationUrl;
  }

  protected override getReadUrl(): string {
    return `${this.organizationUrl}/search`;
  }
}
