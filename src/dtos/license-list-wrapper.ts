import { License } from "./license"

export interface LicenseListWrapper {
    _embedded: {
        licenseDtoList: License[]
    }
}