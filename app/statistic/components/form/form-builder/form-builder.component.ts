import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {isPresent, isBlank} from 'angular2/src/facade/lang';
import {FormControl} from '../form-control/form-control.componenet';
import {Value} from '../../../class/index';

@Component({
    selector: '.form-builder-component'
})

@View({
    template: `

                <div class="form-control-component"
                    *ngFor="#element of elements"
                    [element]="element"
                    [referential]="referential"
                    [data]="data[element.name]"
                    [allData]="data"
                    [log]="true"
                    (initElementEvent)="initElement($event)">
                    (onChangeElement)="onChangeElement($event)"
                </div>

    `,
    directives: [FormControl]
})

export class FormBuilder {
    @Input('elements') elements:any;
    @Input('referential') referential:Object;
    @Output('bindingFormEvent') bindingFormEvent = new EventEmitter();

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

    ngAfterViewInit() {
        console.log(this);
    }

    private buildElements() {
        this.data = new Object;
        this.elements.forEach(element => {
            if (element['module']) {
                element['module']['items'].forEach(subElement => {
                    this.data[subElement.id] = new Value(subElement.default);
                });
            }
            this.data[element.id] = new Value(element.default);
        });
    }

    public initElement(e:any) {
        this.data = e.data;
        this.bindingForm();
    }

    public onChangeElement() {
    }

    private onSubmit() {
        this.bindingForm();
        return false;
    }

    private bindingForm() {

        this.bindingFormEvent.emit({
            data: this.data
        });
        return false;
    }
}