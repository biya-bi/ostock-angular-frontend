import { Component, Input } from '@angular/core';
import { ViewComponent } from './view.component';

@Component({
  template: '',
})
export abstract class EntityViewComponent<E> extends ViewComponent {

  private _entity: E;

  @Input()
  set entity(newValue: E) {
    if (this._entity !== newValue) {
      const oldValue = this._entity;
      this._entity = newValue;
      this.onEntityChange(newValue, oldValue);
    }
  }

  get entity(): E {
    return this._entity;
  }

  protected onEntityChange(newValue: E, oldValue?: E) {
  }
}
