import { NgModule } from "@angular/core";
import { NgbdSortableHeader } from "../sort/sortable.directive";
import { SortableListDirective } from "./sortable-list.directive";

@NgModule({
	declarations: [
		NgbdSortableHeader,
		SortableListDirective,
	],
	exports: [
		NgbdSortableHeader,
		SortableListDirective,
	],
})
export class SortModule { }