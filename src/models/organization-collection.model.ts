import { Organization } from "./organization"

export interface OrganizationCollectionModel {
    _embedded: {
        organizationDtoList: Organization[]
    }
}