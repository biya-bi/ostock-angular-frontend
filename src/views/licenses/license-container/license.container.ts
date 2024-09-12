import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { ModalResponse } from '../../../models/modal-response';
import { LicenseDetailsComponent } from '../license-details/license-details.component';
import { LicenseListComponent } from '../license-list/license-list.component';
import { LicenseWriteComponent } from '../license-write/license-write.component';

@Component({
  selector: 'app-license-container',
  templateUrl: './license.container.html',
  styleUrl: './license.container.css'
})
export class LicenseContainer {

  constructor(private readonly apiConnector: ApiConnector, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  onActivate(component: any) {
    if (component instanceof LicenseListComponent) {
      this.activatedRoute.queryParams.pipe(
        take(1),
        tap(params => component.params = params),
        switchMap(params => this.apiConnector.readLicenses(params['organizationId'])),
        tap(licenses => component.licenses = licenses)
      ).subscribe();
    } else if (component instanceof LicenseDetailsComponent || component instanceof LicenseWriteComponent) {
      this.activatedRoute.queryParams.pipe(
        take(1),
        tap(params => component.params = params),
        switchMap(params => this.apiConnector.readLicense(params['uri'])),
        tap(license => component.license = license)
      ).subscribe();
    }
  }

  onResponse(response: ModalResponse) {
    if (response.answer === 'YES') {
      this.activatedRoute.queryParams.pipe(take(1),
        switchMap(params => this.apiConnector.delete(params['uri'])),
        tap(() => {
          response.closeElement.click();
          this.router.navigate(['/licenses'], { queryParams: this.activatedRoute.snapshot.queryParams });
        })).subscribe();
    }
  }

}
