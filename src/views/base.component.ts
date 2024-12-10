import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    template: '',
    standalone: false
})
export abstract class BaseComponent implements OnDestroy {
    private readonly destroySubject = new Subject<void>();

    readonly destroy$ = this.destroySubject.asObservable();

    ngOnDestroy(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

}