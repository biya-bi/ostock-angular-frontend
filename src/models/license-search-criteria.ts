import { SearchCriteria } from "./search-criteria";

export interface LicenseSearchCriteria extends SearchCriteria {
    description?: string;
    productName?: string;
    licenseType?: string;
}