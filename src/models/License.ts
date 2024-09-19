import { Entity } from "./entity";
import { EntityLinks } from "./entity-links";

export interface License extends Entity<EntityLinks> {
    description: string;
    productName: string;
    licenseType: string;
    comment: string;
}