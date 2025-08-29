import { PageRange } from './page-range';
import { PageRequest } from './page-request';

export interface Pagination {
  request?: PageRequest;
  totalElements?: number;
  range?: PageRange;
}
