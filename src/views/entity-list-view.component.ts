import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { SearchEvent } from '../events/search.event';
import { SortEvent } from '../events/sort.event';
import { SortableAttributeDirective } from '../modules/sort/sortable-attribute.directive';
import { EntityComponent } from './entity.component';

@Component({
  template: '',
  standalone: false
})
export abstract class EntityListViewComponent<T, U extends EntityContext<T, SearchCriteria>, V extends SearchEvent<SearchCriteria>> extends EntityComponent<T, U> {

  @Output() search = new EventEmitter<V>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() select = new EventEmitter<T>();

  @ViewChildren(SortableAttributeDirective) headers: QueryList<SortableAttributeDirective>;

  override busy: boolean = true;
}
