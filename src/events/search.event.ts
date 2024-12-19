import { SearchCriteria } from "../criteria/search-criteria";
import { PageRequest } from "../models/page-request";

export interface SearchEvent<T extends SearchCriteria> {
	searchCriteria?: T;
	pageRequest?: PageRequest;
}