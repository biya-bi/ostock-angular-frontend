import { Component } from '@angular/core';
import { LicenseViewComponent } from '../license-view.component';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  standalone: false,
})
export class LicenseDetailsComponent extends LicenseViewComponent {}
