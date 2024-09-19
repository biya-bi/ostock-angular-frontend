import { EntityEvent } from "./entity-event";
import { License } from "./license";
import { Organization } from "./organization";

export interface LicenseEvent extends EntityEvent<License> {
    organization: Organization;
}