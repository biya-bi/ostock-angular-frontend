import { Component } from "@angular/core";
import { OrganizationSearchCriteria } from "../../../criteria/organization-search-criteria";
import { Organization } from "../../../dtos/organization";
import { OrganizationEvent } from "../../../events/organization.event";
import { EntityListViewComponent } from "../../../views/entity-list-view.component";
import { OrganizationContext } from "../../../contexts/organization.context";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.css',
    standalone: false
})
export class OrganizationListComponent extends EntityListViewComponent<Organization, OrganizationEvent, OrganizationSearchCriteria, OrganizationContext> {
}
