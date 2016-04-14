import {Component, Input, View} from 'angular2/core';
import {Value} from '../../../class/value.class';

@Component({
    selector: 'form-control',
    properties: ['value: data']
})
@View({
    template: `
        <template [ngIf]="element.visible && value != null">
            <div class="pure-control-group">
                <span [ngSwitch]="element.tag">

                    <template [ngSwitchWhen]="'input'">
                        <label [attr.for]="element.id" class="form-element-label">{{element.label}}</label>
                        <input [attr.id]="element.id" [attr.type]="element.type" [(ngModel)]="value.value" [attr.placeholder]="element.display">
                        {{value.value}}
                    </template>

                    <template [ngSwitchWhen]="'checkbox'">
                        <div class="pure-controls">
                            <label [attr.for]="element.id" class="pure-checkbox">
                                <input [attr.id]="element.id" type="checkbox" [(ngModel)]="value.value"> <span class="input-label">{{element.label}}</span>
                                {{value.value}}
                            </label>
                        </div>
                    </template>

                    <template [ngSwitchWhen]="'select'">
                        <label [attr.for]="element.id" class="form-element-label">{{element.label}}</label>
                        <select [attr.id]="element.id" [(ngModel)]="value.value">
                            <option *ngFor="#value of element.values; #i = index" [value]="value">{{element.options[i]}}</option>
                        </select>
                        {{value.value}}
                    </template>

                    <template ngSwitchDefault>
                        <span>Oops! This control type <strong><cite>{{element.tag}}</cite></strong> is unknown. Contact the creator</span>
                    </template>
                </span>
            </div>
        </template>
        <template [ngIf]="!element.visible">
          There is a hidden control here because the element is set to invisible
          <input type="hidden" [(ngModel)]="value.value" />
        </template>
  `
})
export class FormControl {
    @Input('element') element:Object;
    @Input('log') log:Boolean;
    public value:Value;
    public htmlElementType:string;

    ngOnInit() {
        //console.log(this.log);
        return true;
    }
}