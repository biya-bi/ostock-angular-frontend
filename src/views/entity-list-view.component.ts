import { Component, EventEmitter, Input, QueryList, ViewChildren } from '@angular/core';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { EntityEvent } from '../events/entity.event';
import { SearchEvent } from '../events/search.event';
import { SortEvent } from '../events/sort.event';
import { Operation } from '../models/operation';
import { NgbdSortableHeader } from '../modules/sort/sortable.directive';
import { EntityComponent } from './entity.component';

@Component({
    template: '',
    standalone: false
})
export abstract class EntityListViewComponent<T, U extends EntityEvent<T>, V extends SearchCriteria, W extends EntityContext<T, V>> extends EntityComponent<T, U, V, W> {

  private _entities: T[];
  selectedEntity: T;
  operation: Operation;

  search: EventEmitter<SearchEvent<V>> = new EventEmitter<SearchEvent<V>>();
  pageChange: EventEmitter<number> = new EventEmitter<number>();
  sort: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();
  select: EventEmitter<T> = new EventEmitter<T>();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  override ngOnInit(): void {
    super.ngOnInit();
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
