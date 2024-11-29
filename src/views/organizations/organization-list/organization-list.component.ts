import { Component } from "@angular/core";
import { Organization } from "../../../models/organization";
import { OrganizationEvent } from "../../../models/organization-event";
import { OrganizationSearchCriteria } from "../../../models/organization-search-criteria";
import { EntityListViewComponent } from "../../entity-list-view.component";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent extends EntityListViewComponent<Organization, OrganizationEvent, OrganizationSearchCriteria> {
}
