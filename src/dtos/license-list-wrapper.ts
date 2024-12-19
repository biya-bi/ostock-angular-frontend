import { License } from "./license"
import { ListWrapper } from "./list-wrapper"

export interface LicenseListWrapper extends ListWrapper {
	licenseDtoList: License[]
}