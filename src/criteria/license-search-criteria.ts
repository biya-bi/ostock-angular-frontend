import { SearchCriteria } from "./search-criteria";

export interface LicenseSearchCriteria extends SearchCriteria {
	productName?: string;
	description?: string;
	comment?: string;
	licenseType?: string;
}