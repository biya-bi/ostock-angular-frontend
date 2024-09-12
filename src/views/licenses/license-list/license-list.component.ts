import { Component, Input } from '@angular/core';
import { License } from '../../../models/License';
import { ViewComponent } from '../../view.component';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css'
})
export class LicenseListComponent extends ViewComponent {

  @Input() licenses: License[];

}
