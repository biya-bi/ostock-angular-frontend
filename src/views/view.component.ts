import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';

@Component({
    template: '',
})
export abstract class ViewComponent {

    @Input() params: Params;

}
