import { Entity } from "./entity";
import { OrganizationLinks } from "./organization-links";

export interface Organization extends Entity<OrganizationLinks> {
    id: string;
    name: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}