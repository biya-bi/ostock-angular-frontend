import { ContentChildren, Directive, QueryList } from "@angular/core";
import { SortableAttributeDirective, SORTABLE_ATTRIBUTE_NAME } from "./sortable-attribute.directive";

@Directive({
	selector: 'tr[sortableList]',
	host: {
		'(click)': 'onClick($event)'
	},
	standalone: false,
})
export class SortableListDirective {

	@ContentChildren(SortableAttributeDirective, { descendants: true }) private readonly sortableAttributeDirectives: QueryList<SortableAttributeDirective>;

	protected onClick(event: PointerEvent): void {
		const attribute = (event.target as HTMLElement).getAttribute(SORTABLE_ATTRIBUTE_NAME);
		if (!attribute) {
			return;
		}
		this.sortableAttributeDirectives.filter(directive => directive.sortableAttribute != attribute).forEach(directive => directive.direction = '');
	}
}