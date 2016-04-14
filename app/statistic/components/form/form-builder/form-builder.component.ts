import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {isPresent, isBlank} from 'angular2/src/facade/lang';
import {FormControl} from '../form-control/form-control.componenet';
import {Value} from '../../../class/index';

@Component({
    selector: 'form-builder'
})

@View({
    template: `
        <form (ngSubmit)="onSubmit()" #form="ngForm" name="form-filter">
            <fieldset>
                <form-control *ngFor="#element of elements" [element]="element" [data]="data[element.name]" [log]="true"></form-control>
                <div class="pure-controls">
                    <button type="submit" class="pure-button pure-button-primary">Submit</button>
                </div>
            </fieldset>
        </form>
    `,
    directives: [FormControl]
})

export class FormBuilder {
    @Input('elements') elements:any;
    @Output('submitFormEvent') submitFormEvent = new EventEmitter();

    private data:Object;

    constructor() {
        this.data = new Object;
    }

    ngOnInit() {
        this.buildElements();
    }

    ngOnChanges() {
        if (!isBlank(this.elements)) {
            this.buildElements();
            this.bindingForm();
        }
    }

    private buildElements() {
        this.data = new Object;
        this.elements.forEach(element => {
            this.data[element.id] = new Value(element.default);
            //this.data[element.id] = element.default;
        });
    }

    private onSubmit() {
        this.bindingForm();
        return false;
    }

    private bindingForm() {
        this.submitFormEvent.emit({
            data: this.data
        });
        return false;
    }
}