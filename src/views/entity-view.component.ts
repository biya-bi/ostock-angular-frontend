import { Component, Input } from '@angular/core';
import { ViewComponent } from './view.component';

@Component({
  template: '',
})
export abstract class EntityViewComponent<E> extends ViewComponent {

  private _entity: E;

  @Input()
  set entity(value: E) {
    if (this._entity !== value) {
      this._entity = value;
      this.onEntityChange(value, this._entity);
    }
  }

  get entity(): E {
    return this._entity;
  }

  protected onEntityChange(newValue: E, oldValue?: E) {
  }
}
