import { NgModule } from '@angular/core';
import { ValidationMessageDirective } from './directives/validation-message.directive';
import { ValidationTriggerDirective } from './directives/validation-trigger.directive';

@NgModule({
  declarations: [ValidationMessageDirective, ValidationTriggerDirective],
  exports: [ValidationMessageDirective, ValidationTriggerDirective],
})
export class ValidationModule {}
