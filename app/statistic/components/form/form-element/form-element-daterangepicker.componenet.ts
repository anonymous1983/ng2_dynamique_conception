import {Component, Input, View, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: '.form-element-daterangepicker-component'
})
@View({
    template: `
                <div class="form-group form-group-sm">
                    <label class="col-xs-2 control-label form-element-label"
                        [attr.for]="element.id">{{element.label}}</label>
                    <div class="col-xs-8">
                        <input class="form-control input-sm"
                            [(ngModel)]="data[element.id].value"
                            [attr.id]="element.id"
                            [attr.type]="element.type"
                            [attr.placeholder]="element.display"
                            [attr.class]="element.class">
                        <input type="hidden"
                            [attr.id]="element.module.items[0].id"
                            [attr.name]="element.module.items[0].name"/>
                        <input type="hidden"
                            [attr.id]="element.module.items[1].id"
                            [attr.name]="element.module.items[1].name"/>
                        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                    </div>
                </div>
            `
})

export class ElementDaterangepickerControl {
    @Input('element') element:any;
    @Input('data') data:Object;
    @Output('onChangeEvent') onChangeEvent = new EventEmitter();

    private dataElement:Object;
    private ranges:Object = {
        'Mois en cours': [moment().startOf('month'), moment().endOf('month')],
        '3 derniers mois': [moment().subtract(3, 'month'), moment()],
        '6 derniers mois': [moment().subtract(6, 'month'), moment()],
        '12 derniers mois': [moment().subtract(12, 'month'), moment()]
    };

    constructor() {
        this.dataElement = {
            element: {
                date: '',
                startDate: '',
                endDate: ''
            },
            data: {
                date: '',
                startDate: '',
                endDate: ''
            }
        };
    }

    ngAfterViewInit() {
        let startDate = (this.element['module']['config']['defaultRange']) ? this.ranges[this.element['module']['config']['defaultRange']][0].format('YYYY-MM-DD') : '',
            endDate = (this.element['module']['config']['defaultRange']) ? this.ranges[this.element['module']['config']['defaultRange']][1].format('YYYY-MM-DD') : '';

        this.data[this.element['module']['items'][0].id].value = startDate;
        this.data[this.element['module']['items'][1].id].value = endDate;

        this.dataElement['element']['date'] = this.element['id'];
        this.dataElement['element']['startDate'] = this.element['module']['items'][0].id;
        this.dataElement['element']['endDate'] = this.element['module']['items'][1].id;

        $('#' + this.element.id).daterangepicker(
            {
                opens: 'right',
                startDate: (this.element['module']['config']['defaultRange']) ? this.ranges[this.element['module']['config']['defaultRange']][0] : '',
                endDate: (this.element['module']['config']['defaultRange']) ? this.ranges[this.element['module']['config']['defaultRange']][1] : '',
                ranges: this.ranges,
                format: 'DD/MM/YYYY'
            }
        ).on('apply.daterangepicker', (ev, picker) => {
            this.dataElement['data']['date'] = picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD');
            this.dataElement['data']['startDate'] = picker.startDate.format('YYYY-MM-DD');
            this.dataElement['data']['endDate'] = picker.endDate.format('YYYY-MM-DD');
            $('#' + this.element['module']['items'][0]['id']).val(picker.startDate.format('YYYY-MM-DD'));
            $('#' + this.element['module']['items'][1]['id']).val(picker.endDate.format('YYYY-MM-DD'));
            this.bindingData();
        });
    }

    private bindingData() {
        this.onChangeEvent.emit({
            element: this.dataElement['element'],
            data: this.dataElement['data']
        });
        return false;
    }

}