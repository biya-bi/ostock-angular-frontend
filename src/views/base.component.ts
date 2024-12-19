import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    template: '',
    standalone: false
})
export abstract class BaseComponent implements OnInit, OnDestroy {
    private readonly destroySubject = new Subject<void>();

    readonly destroy$ = this.destroySubject.asObservable();

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

}