import { Component, Input } from '@angular/core';
import { EntityEvent } from '../events/entity.event';
import { Operation } from '../models/operation';
import { EntityComponent } from './entity.component';

@Component({
  template: '',
})
export abstract class EntityViewComponent<T, U extends EntityEvent<T>> extends EntityComponent<T, U> {
  @Input() title: string;
  @Input() operation: Operation;

  private _entity: T;

  @Input()
  set entity(newValue: T) {
    if (this._entity !== newValue) {
      const oldValue = this._entity;
      this._entity = newValue;
      this.onEntityChange(newValue, oldValue);
    }
  }

  get entity(): T {
    return this._entity;
  }

  protected onEntityChange(newValue: T, oldValue?: T) {
  }
}
