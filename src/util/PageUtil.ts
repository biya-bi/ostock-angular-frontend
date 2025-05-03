import { Page } from "../dtos/page";
import { PageRange } from "../models/page-range";
import { Pagination } from "../models/pagination";

export class PageUtil {

	static getPagination<T>(page: Page<T>): Pagination {
		return {
			request: {
				pageNumber: page.number + 1,
				pageSize: page.size
			},
			totalElements: page.totalElements,
			range: this.getPageRange(page)
		};
	}

	static getPageRange<T>(page: Page<T>): PageRange {
		const { number, size, totalElements } = page;
		if (!totalElements) {
			return null;
		}
		const start = number * size + 1;
		const end = Math.min(start + size - 1, totalElements);
		return { start, end };
	}
}