import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { ModalResponse } from '../../../models/modal-response';
import { LicenseDetailsComponent } from '../license-details/license-details.component';
import { LicenseListComponent } from '../license-list/license-list.component';
import { LicenseWriteComponent } from '../license-write/license-write.component';
import { ViewComponent } from '../../view.component';

@Component({
  selector: 'app-license-container',
  templateUrl: './license.container.html',
  styleUrl: './license.container.css'
})
export class LicenseContainer {

  constructor(private readonly apiConnector: ApiConnector, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  onActivate(component: ViewComponent) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    component.queryParams = queryParams;
    if (component instanceof LicenseListComponent) {
      this.apiConnector.readLicenses(queryParams['organizationId']).pipe(take(1), tap(licenses => component.licenses = licenses)).subscribe();
    } else if (component instanceof LicenseDetailsComponent || component instanceof LicenseWriteComponent) {
      this.apiConnector.readLicense(queryParams['uri']).pipe(take(1), tap(license => component.license = license)).subscribe();
    }
  }

  onResponse(response: ModalResponse) {
    if (response.answer === 'YES') {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      this.apiConnector.delete(queryParams['uri']).pipe(take(1), tap(() => {
        response.closeElement.click();
        this.router.navigate(['/licenses'], { queryParams: { organizationId: queryParams['organizationId'] } });
      })).subscribe();
    }
  }

}
