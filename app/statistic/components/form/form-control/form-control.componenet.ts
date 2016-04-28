import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {Value} from '../../../class/value.class';
import {ElementChosenControl, ElementDaterangepickerControl, ElementBoutonsgroupControl} from '../form-element/index';

@Component({
    selector: '.form-control-component'
})
@View({
    template: `
        <template [ngIf]="element.visible && data != null">
            <div [ngSwitch]="element.component">


                    <template [ngSwitchWhen]="'daterangepicker'">
                        <div class="form-element-daterangepicker-component"
                            [element]="element"
                            [data]="allData"
                            (onChangeEvent)="onChangeDaterangepickerEvent($event)"></div>
                    </template>

                    <template [ngSwitchWhen]="'chosen'">
                        <div class="form-element-chosen-component"
                            [element]="element"
                            [data]="allData[element.id]"
                            (onChangeEvent)="onChangeChosenEvent($event)"></div>
                    </template>

                    <template [ngSwitchWhen]="'boutonsgroup'">
                        <div class="form-element-boutonsgroup-component"
                            [element]="element"
                            [data]="allData[element.id]"
                            (onChangeEvent)="onChangeBoutonsgroupEvent($event)"></div>
                    </template>

                    <template [ngSwitchWhen]="'input'">

                        <label [attr.for]="element.id" class="form-element-label">{{element.label}}</label>
                        <input [(ngModel)]="allData[element.id].value"
                            [attr.id]="element.id"
                            [attr.type]="element.type"
                            [attr.placeholder]="element.display"
                            [attr.class]="element.class">
                    </template>

                    <template [ngSwitchWhen]="'checkbox'">
                        <div class="pure-controls">
                            <label [attr.for]="element.id" class="pure-checkbox">
                                <input type="checkbox"
                                    [(ngModel)]="allData[element.id].value"
                                    [attr.id]="element.id">
                                    <span class="input-label" [attr.class]="element.class">{{element.label}}</span>
                            </label>
                        </div>
                    </template>

                    <template [ngSwitchWhen]="'select'">
                        <label class="form-element-label" [attr.for]="element.id">{{element.label}}</label>
                        <select [attr.id]="element.id"
                            [(ngModel)]="allData[element.id].value"
                            [attr.class]="element.class">
                            <option *ngFor="#value of element.values; #i = index" [value]="value">{{element.options[i]}}</option>
                        </select>
                    </template>

                    <template ngSwitchDefault>
                        <p class="bg-danger">Oops! This control type <b><cite>{{element.component}}</cite></b> is unknown. Contact the creator</p>
                    </template>

            </div>
        </template>
        <template [ngIf]="!element.visible">
          There is a hidden control here because the element is set to invisible
          <input type="hidden" [(ngModel)]="allData[element.id].value"  [attr.class]="element.class"/>
        </template>
  `,
    directives: [ElementChosenControl, ElementDaterangepickerControl, ElementBoutonsgroupControl]
})
export class FormControl {
    @Input('element') element:Object;
    @Input('allData') allData:Object;
    @Input('data') data:Object;
    @Input('log') log:Boolean;
    @Input('referential') referential:Object;
    @Output('initElementEvent') initElementEvent = new EventEmitter();
    @Output('onChangeElementEvent') onChangeElementEvent = new EventEmitter();

    public ranges:Object = {
        'Mois en cours': [moment().startOf('month'), moment().endOf('month')],
        '3 derniers mois': [moment().subtract(3, 'month'), moment().calendar()],
        '6 derniers mois': [moment().subtract(6, 'month'), moment().calendar()],
        '12 derniers mois': [moment().subtract(12, 'month'), moment()]
    };

    ngOnInit() {
        return true;
    }

    ngAfterViewInit() {
        console.log(this.allData);
        //this.bindingData();
    }

    private onChangeDaterangepickerEvent(e:any) {
        this.allData[e.element['date']].value = e.data['date'];
        this.allData[e.element['startDate']].value = e.data['startDate'];
        this.allData[e.element['endDate']].value = e.data['endDate'];
    }

    private onChangeChosenEvent(e:any) {
        this.allData[e.element['id']].value = e.data.value;
    }

    private onChangeBoutonsgroupEvent(e:any) {
        console.log(e);
    }

    private bindingData() {
        this.initElementEvent.emit({
            data: this.allData
        });
        return false;
    }
}