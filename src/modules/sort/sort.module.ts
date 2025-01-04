import { NgModule } from "@angular/core";
import { SortableAttributeDirective } from "./sortable-attribute.directive";
import { SortableListDirective } from "./sortable-list.directive";

@NgModule({
	declarations: [
		SortableAttributeDirective,
		SortableListDirective,
	],
	exports: [
		SortableAttributeDirective,
		SortableListDirective,
	],
})
export class SortModule { }