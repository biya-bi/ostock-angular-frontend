import { Component, Input } from '@angular/core';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { Operation } from '../models/operation';
import { EntityComponent } from './entity.component';

@Component({
  template: '',
  standalone: false,
})
export abstract class EntityViewComponent<
  T,
  U extends EntityContext<T, SearchCriteria>,
> extends EntityComponent<T, U> {
  @Input() operation: Operation;

  @Input() entity: T;
}
