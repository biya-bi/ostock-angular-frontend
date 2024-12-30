import { Entity } from "./entity";
import { OrganizationLinks } from "./organization-links";

export interface Organization extends Entity<OrganizationLinks> {
    name?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
}