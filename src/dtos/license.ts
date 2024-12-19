import { Entity } from "./entity";
import { LicenseLinks } from "./license-links";

export interface License extends Entity<LicenseLinks> {
    description: string;
    productName: string;
    licenseType: string;
    comment: string;
}