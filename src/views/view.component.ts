import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { BaseComponent } from './base.component';

@Component({
  template: '',
  standalone: false,
})
export abstract class ViewComponent extends BaseComponent {
  @Input() queryParams: Params;
}
