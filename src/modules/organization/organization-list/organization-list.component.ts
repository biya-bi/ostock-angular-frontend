import { Component } from "@angular/core";
import { OrganizationContext } from "../../../contexts/organization.context";
import { OrganizationSearchCriteria } from "../../../criteria/organization-search-criteria";
import { Organization } from "../../../dtos/organization";
import { SearchEvent } from "../../../events/search.event";
import { EntityListViewComponent } from "../../../views/entity-list-view.component";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.css',
    standalone: false
})
export class OrganizationListComponent extends EntityListViewComponent<Organization, OrganizationSearchCriteria, OrganizationContext, SearchEvent<OrganizationSearchCriteria>> {
}
