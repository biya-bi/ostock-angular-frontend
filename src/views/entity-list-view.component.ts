import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { SearchEvent } from '../events/search.event';
import { SortEvent } from '../events/sort.event';
import { Operation } from '../models/operation';
import { NgbdSortableHeader } from '../modules/sort/sortable.directive';
import { EntityComponent } from './entity.component';

@Component({
  template: '',
  standalone: false
})
export abstract class EntityListViewComponent<T, U extends SearchCriteria, V extends EntityContext<T, U>, W extends SearchEvent<U>> extends EntityComponent<T, U, V> {

  operation: Operation;

  @Output() search = new EventEmitter<W>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() select = new EventEmitter<T>();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  override busy: boolean = true;
}
