import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { SearchCriteria } from '../criteria/search-criteria';
import { SearchEvent } from '../events/search.event';
import { SortEvent } from '../events/sort.event';
import { Operation } from '../models/operation';
import { NgbdSortableHeader } from '../modules/sort/sortable.directive';
import { EntityComponent } from './entity.component';
import { EntityContext } from '../contexts/entity.context';

@Component({
  template: '',
  standalone: false
})
export abstract class EntityListViewComponent<T, U extends EntityContext<T, SearchCriteria>, V extends SearchEvent<SearchCriteria>> extends EntityComponent<T, U> {

  operation: Operation;

  @Output() search = new EventEmitter<V>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() select = new EventEmitter<T>();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  override busy: boolean = true;
}
