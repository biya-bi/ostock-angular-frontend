import { License } from "../dtos/license";
import { Organization } from "../dtos/organization";
import { EntityEvent } from "../events/entity-event";

export interface LicenseEvent extends EntityEvent<License> {
    organization: Organization;
}