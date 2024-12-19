import { SearchCriteria } from "../criteria/search-criteria";
import { Operation } from "../models/operation";
import { Pagination } from "../models/pagination";

export interface EntityContext<T, U extends SearchCriteria> {
	entities: T[];
	selectedEntity?: T;
	pagination: Pagination;
	operation?: Operation;
	searchCriteria?: U;
}