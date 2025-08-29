import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SortDirection } from '../../models/sort-direction';
import { SortEvent } from '../../events/sort.event';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export const SORTABLE_ATTRIBUTE_NAME = 'sortableAttribute';

@Directive({
  selector: `th[${SORTABLE_ATTRIBUTE_NAME}]`,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
  standalone: false,
})
export class SortableAttributeDirective {
  @Input() sortableAttribute: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({
      attribute: this.sortableAttribute,
      direction: this.direction,
    });
  }
}
