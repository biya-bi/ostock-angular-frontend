import { Component } from '@angular/core';
import { LicenseContentComponent } from '../license-content/license-content.component';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrl: './license-details.component.css'
})
export class LicenseDetailsComponent extends LicenseContentComponent {
}
