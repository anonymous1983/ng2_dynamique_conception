import {Component, Input, View, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: '.form-element-chosen-component'
})
@View({
    template: `
                <div class="form-group form-group-sm">
                    <label class="col-xs-2 control-label"
                        [attr.for]="element.id">{{element.label}}</label>
                    <div class="col-xs-8">
                        <span [ngSwitch]="element.module.config.multiple">
                            <template [ngSwitchWhen]="true">
                                <select title="Pays" [attr.id]="element.id" [attr.class]="element.class" multiple data-placeholder="Tous">
                                    <option>Mon service</option>
                                    <option>Service 2</option>
                                    <option>Service 3</option>
                                </select>
                            </template>
                            <template [ngSwitchWhen]="false">
                                <select title="Pays" [attr.id]="element.id" [attr.class]="element.class" data-placeholder="Tous">
                                    <option>Mon service</option>
                                    <option>Service 2</option>
                                    <option>Service 3</option>
                                </select>
                            </template>
                        </span>
                    </div>
                </div>
            `
})

export class ElementChosenControl {
    @Input('element') element:any;
    @Input('data') data:Object;
    @Output('onChangeEvent') onChangeEvent = new EventEmitter();

    multiple:string = 'multiple';

    ngAfterViewInit() {
        $('#' + this.element.id).chosen({
            disable_search: false,
            no_results_text: 'Aucun résultat. Appuyez sur la touche \'Entrée\' pour ajouter.',
            placeholder_text_multiple: 'Sélectionnez',
            search_contains: true
        }).on('change', ($event, params) => {
            let values = $('#' + this.element.id).chosen().val();
            this.data['value'] = values;
            this.bindingData();
        });
    }

    private bindingData() {
        this.onChangeEvent.emit({
            element: this.element,
            data: this.data
        });
        return false;
    }
}