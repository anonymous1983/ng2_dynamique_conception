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

                <form (ngSubmit)="onSubmit()" #form="ngForm" name="form-filter" class="form-horizontal">
                    <div *ngFor="#item of formElements; #i = index">
                        <div class="separator"></div>

                        <div class="panel-heading" [attr.id]="item.fieldset.id">
                            <h3 class="panel-title">
                                <a class="collapsed"
                                    data-toggle="collapse"
                                    aria-expanded="false"
                                    [attr.href]="getPanelAttrHref(item.fieldset.panel.id)"
                                    [attr.aria-controls]="item.fieldset.panel.id">
                                    <i class="fa"></i>{{item.fieldset.title}}
                                </a>
                            </h3>
                        </div>

                        <div class="panel-collapse collapse"
                            role="tabpanel"
                            [ngClass]="{in: item.fieldset.expanded}"
                            [attr.id]="item.fieldset.panel.id"
                            [attr.aria-labelledby]="item.fieldset.panel.labelledby">

                           <div class="panel-body">

                                <div class="form-control-component"
                                    *ngFor="#element of item.elements"
                                    [element]="element"
                                    [referential]="referential"
                                    [data]="data[element.name]"
                                    [allData]="data"
                                    [log]="true"
                                    (initElementEvent)="initElement($event)"
                                    (onChangeElement)="onChangeElement($event)">
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="pure-controls">
                        <button type="submit" class="pure-button pure-button-primary">Submit</button>
                    </div>
                </form>



    `,
    directives: [FormControl]
})

export class FormBuilder {

    @Input('formElements') formElements:any;
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
        if (!isBlank(this.formElements)) {
            this.buildElements();
        }
    }

    ngAfterViewInit() {
        console.log(this);
        this.bindingForm();
    }

    private buildElements() {
        this.data = new Object;
        this.formElements.forEach(item => {
            item.elements.forEach(element => {
                if (element['module']) {
                    element['module']['items'].forEach(subElement => {
                        this.data[subElement.id] = new Value(subElement.default);
                    });
                }
                this.data[element.id] = new Value(element.default);
            });
        });

    }

    public initElement(e:any) {
        this.data = e.data;
        this.bindingForm();
    }

    public onChangeElement() {
        this.bindingForm();
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

    public getPanelAttrHref(id) {
        return '#' + id;
    }
}