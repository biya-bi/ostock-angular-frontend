import { Organization } from "./organization";
import { WriteMode } from "./write-mode";

export interface OrganizationWriteEvent {
    organization: Organization;
    mode: WriteMode
    closeElement?: HTMLElement;
}