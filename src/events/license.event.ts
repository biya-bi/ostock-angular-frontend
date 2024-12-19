import { License } from "../dtos/license";
import { EntityEvent } from "./entity.event";

export interface LicenseEvent extends EntityEvent<License> {
}