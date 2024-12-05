import { Injectable } from '@angular/core';
import { SearchCriteria } from '../criteria/search-criteria';
import { PageRequest } from '../models/page-request';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  parseCriteria<T extends SearchCriteria>(searchCriteria: T): T {
    let criteria: SearchCriteria = searchCriteria;
    if (!criteria) {
      criteria = {};
    }
    const clone = JSON.parse(JSON.stringify(criteria));
    for (let key in clone) {
      let value = clone[key];
      if (typeof value === 'string' && value.trim().length === 0) {
        delete clone[key];
      }
    }
    return clone;
  }

  parsePage(page: Pagination): PageRequest {
    let pageNumber = 0;
    let pageSize = 20;
    if (page?.request?.pageNumber) {
      pageNumber = page.request.pageNumber - 1;
    }
    if (page?.request?.pageSize) {
      pageSize = page.request.pageSize;
    }
    return { pageNumber, pageSize };
  }
}
