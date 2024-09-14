import { Component, EventEmitter, Output } from "@angular/core";
import { Organization } from "../../../models/organization";
import { EntityListViewComponent } from "../../entity-list-view.component";
import { OrganizationEvent } from "../../../models/organization-event";
import { Operation } from "../../../models/operation";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent extends EntityListViewComponent<Organization> {
    @Output() write = new EventEmitter<OrganizationEvent>();

    Operation = Operation
}
