import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { EntityContext } from '../contexts/entity.context';
import { SearchCriteria } from '../criteria/search-criteria';
import { EntityEvent } from '../events/entity.event';
import { Operation } from '../models/operation';
import { ViewComponent } from './view.component';
@Component({
  template: '',
  standalone: false
})
export abstract class EntityComponent<T, U extends EntityContext<T, SearchCriteria>> extends ViewComponent {
  @Output() manage = new EventEmitter<EntityEvent<T>>();

  Operation = Operation;

  @Input() busy: boolean;
  @Input() enableManualContext: boolean;
  @Input() context: U;

  private readonly contextSignal = inject(ROUTER_OUTLET_DATA) as Signal<U>;
  private readonly context$ = toObservable(this.contextSignal);

  override ngOnInit(): void {
    super.ngOnInit();
    this.context$.pipe(takeUntil(this.destroy$), tap(context => this.onContextChange(context))).subscribe();
  }

  protected onContextChange(context: U): void {
    if (!this.enableManualContext) {
      this.context = context;
    }
  }
}
