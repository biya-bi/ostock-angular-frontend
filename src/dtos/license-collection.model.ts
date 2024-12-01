import { License } from "./license"

export interface LicenseCollectionModel {
    _embedded: {
        licenseDtoList: License[]
    }
}