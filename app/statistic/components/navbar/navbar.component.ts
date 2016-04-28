import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {isPresent, isBlank } from 'angular2/src/facade/lang';
import {Util} from '../../../atexo/common/services/atexo.service';

@Component({
    selector: '.navbar-component',
    template: `
    <form class="form-horizontal" (ngSubmit)="onSubmit()" #form="ngForm" name="form-nav-bar">
        <div class="form-group form-group-sm">
            <label class="col-xs-2 control-label" for="achats_requetes">Objet du rapport</label>
            <div class="col-xs-8">
                <select data-placeholder="Selectionnez..." class="referentiels-longInput raport-chosen-select"
                        title="Requêtes" id="achats_requetes" *ngIf="subMap.length" [ngModel]="subMapSelectedIndex" (ngModelChange)="changeItem($event)">>
                    <option *ngFor="#item of subMap; #i = index" [value]="i">{{item.label}}</option>
                </select>
            </div>
        </div>
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

    ngAfterViewInit() {
        //noinspection TypeScriptUnresolvedFunction
        $('.raport-chosen-select').chosen({
            disable_search: false,
            no_results_text: 'Aucun résultat. Appuyez sur la touche \'Entrée\' pour ajouter.',
            placeholder_text_multiple: 'Sélectionnez',
            search_contains: true
        }).on('change', ($event, params) => {
            this.changeItem(params.selected);
        });
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