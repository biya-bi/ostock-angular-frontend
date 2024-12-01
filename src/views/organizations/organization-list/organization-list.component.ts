import { Component } from "@angular/core";
import { OrganizationSearchCriteria } from "../../../criteria/organization-search-criteria";
import { Organization } from "../../../dtos/organization";
import { OrganizationEvent } from "../../../events/organization-event";
import { EntityListViewComponent } from "../../entity-list-view.component";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent extends EntityListViewComponent<Organization, OrganizationEvent, OrganizationSearchCriteria> {
}
