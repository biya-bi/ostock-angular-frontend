import { OrganizationSearchCriteria } from "../criteria/organization-search-criteria";
import { Organization } from "../dtos/organization";
import { EntityContext } from "./entity.context";
import { LicenseContext } from "./license.context";

export interface OrganizationContext extends EntityContext<Organization, OrganizationSearchCriteria> {
	licenseContext?: LicenseContext;
}