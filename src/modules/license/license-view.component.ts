import { Component } from '@angular/core';
import { LicenseContext } from '../../contexts/license.context';
import { License } from '../../dtos/license';
import { EntityViewComponent } from '../../views/entity-view.component';

@Component({
    template: ''
})
export abstract class LicenseViewComponent extends EntityViewComponent<License, LicenseContext> {
}
