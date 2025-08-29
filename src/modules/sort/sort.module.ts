import { NgModule } from '@angular/core';
import { SortableAttributeDirective } from './sortable-attribute.directive';
import { SortableHeaderDirective } from './sortable-header.directive';

@NgModule({
  declarations: [SortableAttributeDirective, SortableHeaderDirective],
  exports: [SortableAttributeDirective, SortableHeaderDirective],
})
export class SortModule {}
