import { License } from "./License"

export interface LicenseCollectionModel {
    _embedded: {
        licenseList: License[]
    }
}