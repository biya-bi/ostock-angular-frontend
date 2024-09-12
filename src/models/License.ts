import { Entity } from "./entity";

export interface License extends Entity {
    id: string;
    description: string;
    productName: string;
    licenseType: string;
    comment: string;
}