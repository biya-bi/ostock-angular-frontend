import { Component, Input } from '@angular/core';
import { ViewComponent } from './view.component';

@Component({
  template: '',
})
export abstract class EntityListViewComponent<E> extends ViewComponent {

  private _entities: E[];

  @Input()
  set entities(value: E[]) {
    if (this._entities !== value) {
      this._entities = value;
      this.onEntitiesChange(value, this._entities);
    }
  }

  get entities(): E[] {
    return this._entities;
  }

  protected onEntitiesChange(newValue: E[], oldValue?: E[]) {
  }
}
