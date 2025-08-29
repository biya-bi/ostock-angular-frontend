import { SortDirection } from '../models/sort-direction';

export interface SortEvent {
  attribute: string;
  direction: SortDirection;
}
