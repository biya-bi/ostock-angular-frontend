import { Component } from '@angular/core';
import { LicenseViewComponent } from '../license-view.component';

@Component({
  selector: 'app-license-delete',
  templateUrl: './license-delete.component.html',
  standalone: false,
})
export class LicenseDeleteComponent extends LicenseViewComponent {}
