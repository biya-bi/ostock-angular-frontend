import { Component, EventEmitter, Input, QueryList, ViewChildren } from '@angular/core';
import { SearchCriteria } from '../criteria/search-criteria';
import { NgbdSortableHeader } from '../directives/sortable.directive';
import { EntityEvent } from '../events/entity.event';
import { SortEvent } from '../events/sort.event';
import { Pagination } from '../models/pagination';
import { EntityComponent } from './entity.component';

@Component({
  template: '',
})
export abstract class EntityListViewComponent<T, U extends EntityEvent<T>, V extends SearchCriteria> extends EntityComponent<T, U> {

  private _entities: T[];
  selectedEntity: T;
  searchCriteria: V;
  pagination: Pagination;

  search: EventEmitter<V> = new EventEmitter<V>();
  pageChange: EventEmitter<number> = new EventEmitter<number>();
  sort: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit(): void {
    this.busy = true;
  }

  @Input()
  set entities(newValue: T[]) {
    if (this._entities !== newValue) {
      const oldValue = this._entities;
      this._entities = newValue;
      this.onEntitiesChange(newValue, oldValue);
    }
  }

  get entities(): T[] {
    return this._entities;
  }

  protected onEntitiesChange(newValue: T[], oldValue?: T[]) {
  }
}
