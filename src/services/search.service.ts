import { Injectable } from '@angular/core';
import { SearchCriteria } from '../criteria/search-criteria';
import { PageRequest } from '../models/page-request';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  parseCriteria<T extends SearchCriteria>(searchCriteria: T): T {
    let criteria: SearchCriteria = searchCriteria;
    if (!criteria) {
      criteria = {};
    }
    const clone = JSON.parse(JSON.stringify(criteria));
    for (const key in clone) {
      const value = clone[key];
      if (typeof value === 'string' && value.trim().length === 0) {
        delete clone[key];
      }
    }
    return clone;
  }

  parsePageRequest(pageRequest: PageRequest): PageRequest {
    let pageNumber = 0;
    let pageSize = 20;
    if (pageRequest?.pageNumber) {
      pageNumber = pageRequest.pageNumber - 1;
    }
    if (pageRequest?.pageSize) {
      pageSize = pageRequest.pageSize;
    }
    return { pageNumber, pageSize };
  }
}
