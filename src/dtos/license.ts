import { Entity } from "./entity";
import { LicenseLinks } from "./license-links";
import { Organization } from "./organization";

export interface License extends Entity<LicenseLinks> {
    description: string;
    productName: string;
    licenseType: string;
    comment: string;
    organization?: Organization;
}