import {Component, Input, View, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: '.form-element-boutonsgroup-component'
})
@View({
    template: `
                <div class="form-group form-group-sm">
                    <label class="col-xs-2 control-label form-element-label"
                        [attr.for]="element.id">{{element.label}}</label>
                    <div class="col-xs-8">
                        <div class="btn-group btn-statut" data-toggle="buttons">
                            <label class="btn btn-default" *ngFor="#value of element.values; #i = index" (click)="clickEvent(i, value, $event)">
                                <input type="checkbox"
                                    [attr.id]="element.id"
                                    [value]="value">
                                {{element.options[i]}}
                            </label>
                        </div>
                    </div>
                </div>
            `
})

export class ElementBoutonsgroupControl {
    @Input('element') element:any;
    @Input('data') data:Object;
    @Output('onChangeEvent') onChangeEvent = new EventEmitter();


    ngAfterViewInit() {
        //$('#' + this.element.id).show();
        this.bindingData();
        this.data['value'] = new Array();
    }

    clickEvent(index:number, value:any, e:any) {
        let indexOf:number = this.data['value'].indexOf(value);
        (indexOf === -1) ? this.data['value'].push(value) : this.data['value'].splice(indexOf, 1);
        this.bindingData();
    }

    private bindingData() {
        this.onChangeEvent.emit({
            element: this.element,
            data: this.data
        });
        return false;
    }
}