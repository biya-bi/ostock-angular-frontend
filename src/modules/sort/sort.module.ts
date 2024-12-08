import { NgModule } from "@angular/core";
import { NgbdSortableHeader } from "../sort/sortable.directive";

@NgModule({
	declarations: [
		NgbdSortableHeader,
	],
	exports: [
		NgbdSortableHeader,
	],
})
export class SortModule { }