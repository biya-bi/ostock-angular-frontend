import { Injectable } from '@angular/core';
import { SearchCriteria } from '../criteria/search-criteria';
import { Page } from '../models/page';
import { PageRequest } from '../models/page-request';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  parseCriteria(searchCriteria: SearchCriteria): SearchCriteria {
    if (!searchCriteria) {
      searchCriteria = {};
    }
    const clone = JSON.parse(JSON.stringify(searchCriteria));
    for (let key in clone) {
      let value = clone[key];
      if (typeof value === 'string' && value.trim().length === 0) {
        delete clone[key];
      }
    }
    return clone;
  }

  parsePage(page: Page): PageRequest {
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
