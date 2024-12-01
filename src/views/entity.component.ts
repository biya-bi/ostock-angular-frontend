import { Component, EventEmitter, Output } from '@angular/core';
import { EntityEvent } from '../events/entity.event';
import { ViewComponent } from './view.component';
import { Operation } from '../models/operation';

@Component({
  template: '',
})
export abstract class EntityComponent<T, U extends EntityEvent<T>> extends ViewComponent {
  @Output() manage = new EventEmitter<U>();

  Operation = Operation;
}
