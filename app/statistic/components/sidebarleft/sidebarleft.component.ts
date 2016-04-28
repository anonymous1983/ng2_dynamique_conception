import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {Util} from '../../../atexo/common/services/atexo.service';
import {isPresent, isBlank} from 'angular2/src/facade/lang';

@Component({
    selector: '.sidebarleft-component',
    template: `
        <div id="menu">
            <ul id="menuList">
                <li class="menu-top-open" id="noteOpportunite">
                    <span onclick="toggleMenu(this);">Rapports </span>
                    <ul class="ss-menu-closed" *ngIf="map.length">
                        <li class="off" *ngFor="#item of map; #i = index" [class.active]="item.id === mapSelected.id"><a href="#"(click)="clickItem(item)">{{item.label}}</a></li>
                    </ul>
                </li>

            </ul>
        </div>
    `
})

export class SideBarLeft {
    @Input('obj') map:any;
    @Output('clickItemEvent') clickItemEvent = new EventEmitter();

    public mapSelected:Object;

    ngOnChanges() {
        if (!isBlank(this.map)) {
            this.bindingItem(this.defaultMapIdSelected());
        }
    }

    public clickItem(item) {
        this.bindingItem(item);
        return false;
    }

    private bindingItem(item) {
        this.mapSelected = item;
        this.clickItemEvent.emit({
            item: item
        });
        return false;
    }

    private defaultMapIdSelected() {
        let _mapSelectedIndex:number = 0;
        _mapSelectedIndex = Util.getInstance().arrayObjectFindIndex(this.map, (e) => {
            return e.default === true;
        });
        _mapSelectedIndex = (_mapSelectedIndex === -1) ? 0 : _mapSelectedIndex;
        this.mapSelected = this.map[_mapSelectedIndex];
        return this.mapSelected;
    }

}