import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { License } from '../../../models/License';
import { LicenseWriteComponent } from './license-write.component';

@Component({
  selector: 'app-license-edit',
  templateUrl: './license-write.component.html',
  styleUrl: './license-write.component.css'
})
export class LicenseEditComponent extends LicenseWriteComponent {

  constructor(protected override readonly router: Router, private readonly apiConnector: ApiConnector) {
    super(router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // TODO: Get title from localized resources
    this.title$ = of('Edit license');
  }

  protected override onSubmit(license: License): Observable<License> {
    return this.apiConnector.updateLicense(license);
  }

}
