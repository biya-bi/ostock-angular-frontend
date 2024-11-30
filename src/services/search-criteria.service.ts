import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-criteria';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  parse(searchCriteria: SearchCriteria): SearchCriteria {
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
}
