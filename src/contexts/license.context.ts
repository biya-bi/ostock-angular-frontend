import { LicenseSearchCriteria } from "../criteria/license-search-criteria";
import { License } from "../dtos/license";
import { Organization } from "../dtos/organization";
import { EntityContext } from "./entity.context";

export interface LicenseContext extends EntityContext<License, LicenseSearchCriteria> {
	organizations: Organization[];
	selectedOrganization?: Organization;
}