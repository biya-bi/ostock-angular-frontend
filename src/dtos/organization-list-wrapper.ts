import { ListWrapper } from "./list-wrapper"
import { Organization } from "./organization"

export interface OrganizationListWrapper extends ListWrapper {
    organizationDtoList: Organization[]
}