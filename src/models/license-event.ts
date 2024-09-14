import { EntityEvent } from "./entity-event";
import { License } from "./License";
import { Organization } from "./organization";

export interface LicenseEvent extends EntityEvent<License> {
    organization: Organization;
}