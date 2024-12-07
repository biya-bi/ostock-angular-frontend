import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { NgbdSortableHeader } from "../../directives/sortable.directive";
import { LicenseDeleteComponent } from "../../views/licenses/license-delete/license-delete.component";
import { LicenseDetailsComponent } from "../../views/licenses/license-details/license-details.component";
import { LicenseListComponent } from "../../views/licenses/license-list/license-list.component";
import { LicenseWriteComponent } from "../../views/licenses/license-write/license-write.component";
import { OrganizationContainer } from "./organization-container/organization.container";
import { OrganizationDeleteComponent } from "./organization-delete/organization-delete.component";
import { OrganizationDetailsComponent } from "./organization-details/organization-details.component";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { OrganizationWriteComponent } from "./organization-write/organization-write.component";
import { ORGANIZATION_ROUTES } from "./organization.routes";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		NgbModule,
		RouterModule.forChild(ORGANIZATION_ROUTES),
	],
	declarations: [
		OrganizationContainer,
		OrganizationDeleteComponent,
		OrganizationDetailsComponent,
		OrganizationListComponent,
		OrganizationWriteComponent,
		LicenseDeleteComponent,
		LicenseDetailsComponent,
		LicenseListComponent,
		LicenseWriteComponent,
		NgbdSortableHeader,
	],
	exports: [
		OrganizationContainer,
	],
})
export class OrganizationModule { }