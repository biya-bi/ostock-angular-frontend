import { Component, EventEmitter, Output } from '@angular/core';
import { LicenseEvent } from '../../../models/license-event';
import { LicenseViewComponent } from '../license-view.component';

@Component({
  selector: 'app-license-delete',
  templateUrl: './license-delete.component.html',
  styleUrl: './license-delete.component.css'
})
export class LicenseDeleteComponent extends LicenseViewComponent {

  @Output() delete = new EventEmitter<LicenseEvent>();

}
