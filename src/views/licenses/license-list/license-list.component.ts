import { Component, Input } from '@angular/core';
import { License } from '../../../models/License';
import { Params } from '@angular/router';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css'
})
export class LicenseListComponent {

  @Input() licenses: License[];
  @Input() params: Params;

}
