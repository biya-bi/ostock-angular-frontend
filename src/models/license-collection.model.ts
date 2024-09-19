import { License } from "./License"

export interface LicenseCollectionModel {
    _embedded: {
        licenseDtoList: License[]
    }
}