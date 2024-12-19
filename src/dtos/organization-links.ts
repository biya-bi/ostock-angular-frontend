import { EntityLinks } from "./entity-links";
import { Link } from "./link";

export interface OrganizationLinks extends EntityLinks {
    licenses: Link;
    addLicense: Link;
}