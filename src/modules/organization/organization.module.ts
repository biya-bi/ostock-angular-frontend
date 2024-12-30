import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { LicenseModule } from "../license/license.module";
import { SortModule } from "../sort/sort.module";
import { ValidationModule } from "../validation/validation.module";
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
		LicenseModule,
		SortModule,
		ValidationModule,
	],
	declarations: [
		OrganizationContainer,
		OrganizationDeleteComponent,
		OrganizationDetailsComponent,
		OrganizationListComponent,
		OrganizationWriteComponent,
	],
	exports: [
		OrganizationContainer,
	],
})
export class OrganizationModule { }