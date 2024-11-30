import { Component, EventEmitter, Input } from '@angular/core';
import { EntityEvent } from '../models/entity-event';
import { SearchCriteria } from '../models/search-criteria';
import { EntityComponent } from './entity.component';
import { Page } from '../models/page';

@Component({
  template: '',
})
export abstract class EntityListViewComponent<T, U extends EntityEvent<T>, V extends SearchCriteria> extends EntityComponent<T, U> {

  private _entities: T[];
  selectedEntity: T;
  searchCriteria: V;
  page: Page;

  search: EventEmitter<V> = new EventEmitter<V>();
  pageChange: EventEmitter<number> = new EventEmitter<number>();

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
