import { LicenseSearchCriteria } from '../criteria/license-search-criteria';
import { SearchEvent } from './search.event';

export interface LicenseSearchEvent extends SearchEvent<LicenseSearchCriteria> {
  uri?: string;
}
