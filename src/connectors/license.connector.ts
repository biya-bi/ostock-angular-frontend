import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LicenseSearchCriteria } from '../criteria/license-search-criteria';
import { License } from '../dtos/license';
import { LicenseListWrapper } from '../dtos/license-list-wrapper';
import { CrudConnector } from './crud.connector';

@Injectable({
	providedIn: 'root'
})
export class LicenseConnector extends CrudConnector<License, LicenseSearchCriteria, LicenseListWrapper> {

	private readonly licenseUrl = `${this.getUrl()}/v1/license`;

	constructor(protected override readonly oAuthService: OAuthService, protected override readonly httpClient: HttpClient) {
		super(oAuthService, httpClient);
	}

	protected override getCreateUrl(): string {
		return this.licenseUrl;
	}

	protected override getReadUrl(): string {
		return `${this.licenseUrl}/search`;
	}

}