import { Component } from '@angular/core';
import { License } from '../../../models/License';
import { EntityListViewComponent } from '../../entity-list-view.component';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css'
})
export class LicenseListComponent extends EntityListViewComponent<License> {
}
