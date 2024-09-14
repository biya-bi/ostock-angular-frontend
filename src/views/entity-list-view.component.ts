import { Component, Input } from '@angular/core';
import { EntityEvent } from '../models/entity-event';
import { EntityComponent } from './entity.component';

@Component({
  template: '',
})
export abstract class EntityListViewComponent<T, U extends EntityEvent<T>> extends EntityComponent<T, U> {

  private _entities: T[];

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
