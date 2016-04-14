import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {isPresent, isBlank } from 'angular2/src/facade/lang';
import {Util} from '../../../atexo/common/services/atexo.service';

@Component({
    selector: '.navbar-component',
    template: `
    <form (ngSubmit)="onSubmit()" #form="ngForm" name="form-nav-bar">
        <select class="form-control" *ngIf="subMap.length" [ngModel]="subMapSelectedIndex" (ngModelChange)="changeItem($event)">
            <option *ngFor="#item of subMap; #i = index" [value]="i">{{item.label}}</option>
        </select>
    </form>`

})

export class NavBar {

    @Input('obj') currentMap:any;
    @Output('changeItemEvent') changeItemEvent = new EventEmitter();

    public subMap:Array<Object>;
    public subMapSelectedIndex:number;


    ngOnChanges() {
        if (!isBlank(this.currentMap)) {
            this.subMap = this.currentMap.childrens;
            this.bindingItem(this.defaultSubRootIdSelected());
        }
    }


    public changeItem(item) {
        this.bindingItem(item);
    }

    private bindingItem(item) {
        this.subMapSelectedIndex = item;
        this.changeItemEvent.emit({
            item: this.subMap[this.subMapSelectedIndex]
        });
    }

    private defaultSubRootIdSelected() {
        let _subMapSelectedIndex:number = 0;
        _subMapSelectedIndex = Util.getInstance().arrayObjectFindIndex(this.subMap, (e) => {
            return e.default === true;
        });
        this.subMapSelectedIndex = (_subMapSelectedIndex === -1) ? 0 : _subMapSelectedIndex;
        return this.subMapSelectedIndex;
    }
}