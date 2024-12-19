import { Component, Input } from '@angular/core';
import { License } from '../../dtos/license';
import { Organization } from '../../dtos/organization';
import { EntityViewComponent } from '../../views/entity-view.component';
import { LicenseEvent } from '../../events/license.event';
import { LicenseSearchCriteria } from '../../criteria/license-search-criteria';
import { LicenseContext } from '../../contexts/license.context';

@Component({
    template: '',
    standalone: false
})
export abstract class LicenseViewComponent extends EntityViewComponent<License, LicenseEvent, LicenseSearchCriteria, LicenseContext> {
  @Input() organization: Organization;
}
