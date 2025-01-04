import { ContentChildren, Directive, QueryList } from "@angular/core";
import { NgbdSortableHeader } from "./sortable.directive";

@Directive({
	selector: 'tr[sortableList]',
	host: {
		'(click)': 'onClick($event)'
	},
	standalone: false,
})
export class SortableListDirective {

	@ContentChildren(NgbdSortableHeader, { descendants: true }) private readonly headers: QueryList<NgbdSortableHeader>;

	protected onClick(event: PointerEvent): void {
		const attribute = (event.target as HTMLElement).getAttribute('sortable');
		if (!attribute) {
			return;
		}
		this.headers.filter(header => header.sortable != attribute).forEach(header => header.direction = '');
	}
}