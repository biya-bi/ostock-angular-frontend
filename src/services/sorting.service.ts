import { Injectable } from "@angular/core";
import { SortDirection } from "../models/sort-direction";

@Injectable({
    providedIn: 'root'
})
export class SortingService<T> {
    sort(entities: T[], attribute: string, direction: SortDirection): T[] {
        if (direction === '') {
            return entities;
        }
        return [...entities].sort((x, y) => {
            const result = this.compare(x[attribute], y[attribute]);
            return direction === 'asc' ? result : -result;
        });
    }

    private compare(x: any, y: any): number {
        return x < y ? -1 : x > y ? 1 : 0;
    }
}