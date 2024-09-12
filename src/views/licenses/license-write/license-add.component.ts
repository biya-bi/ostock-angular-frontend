import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { License } from '../../../models/License';
import { LicenseWriteComponent } from './license-write.component';

@Component({
  selector: 'app-license-add',
  templateUrl: './license-write.component.html',
  styleUrl: './license-write.component.css'
})
export class LicenseAddComponent extends LicenseWriteComponent implements OnInit {

  constructor(protected override readonly router: Router, private readonly apiConnector: ApiConnector) {
    super(router);
  }

  ngOnInit(): void {
    // TODO: Get title from localized resources
    this.title$ = of('Add a license');
  }

  protected override onSubmit(license: License): Observable<License> {
    return this.apiConnector.createLicense(license, this.queryParams['organizationId']);
  }

}
