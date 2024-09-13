import { EntityLinks } from "./entity-links";

export interface Entity<T extends EntityLinks> {
    _links: T;
}