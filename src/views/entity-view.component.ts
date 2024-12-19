import { Component, Input } from '@angular/core';
import { EntityEvent } from '../events/entity.event';
import { Operation } from '../models/operation';
import { EntityComponent } from './entity.component';
import { SearchCriteria } from '../criteria/search-criteria';
import { EntityContext } from '../contexts/entity.context';

@Component({
  template: '',
  standalone: false
})
export abstract class EntityViewComponent<T, U extends EntityEvent<T>, V extends SearchCriteria, W extends EntityContext<T, V>> extends EntityComponent<T, U, V, W> {
  @Input() operation: Operation;

  @Input() entity: T;

}
