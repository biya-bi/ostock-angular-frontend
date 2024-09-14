import { License } from "./License";
import { Organization } from "./organization";
import { WriteMode } from "./write-mode";

export interface LicenseWriteEvent {
    license: License;
    organization: Organization;
    mode: WriteMode
    closeElement?: HTMLElement;
}