import { Component } from '@angular/core';
import { LicenseContext } from '../../contexts/license.context';
import { LicenseSearchCriteria } from '../../criteria/license-search-criteria';
import { License } from '../../dtos/license';
import { LicenseEvent } from '../../events/license.event';
import { EntityViewComponent } from '../../views/entity-view.component';

@Component({
    template: '',
    standalone: false
})
export abstract class LicenseViewComponent extends EntityViewComponent<License, LicenseEvent, LicenseSearchCriteria, LicenseContext> {
}
