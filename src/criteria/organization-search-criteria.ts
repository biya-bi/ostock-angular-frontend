import { SearchCriteria } from "./search-criteria";

export interface OrganizationSearchCriteria extends SearchCriteria {
    name?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
}