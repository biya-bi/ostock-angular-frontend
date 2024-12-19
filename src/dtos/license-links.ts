import { EntityLinks } from "./entity-links";
import { Link } from "./link";

export interface LicenseLinks extends EntityLinks {
    organization: Link;
}