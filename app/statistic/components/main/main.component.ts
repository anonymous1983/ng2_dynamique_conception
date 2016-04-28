import {Component, Input, View} from 'angular2/core';
import {isPresent, isBlank} from 'angular2/src/facade/lang';

@Component({
    selector: '.main-component',
    template: `
        <div class="error" *ngIf="!data.length">Aucune donnée ne correspond a votre recherche</div>

        <table class="table table-bordered table-striped"  *ngIf="data.length">
            <thead>
                <tr>
                    <th *ngFor="#item of currentSubMap.config.table.header.th; #i = index">{{item.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#item of data; #i = index">
                    <td *ngFor="#subItem of currentSubMap.config.table.header.th; #j = index">{{item[subItem.index]}}</td>
                </tr>
            </tbody>
        </table>
    `,
    directives: []
})
export class Main {
    @Input('map') map:any;
    @Input('currentMap') currentMap:any;
    @Input('currentSubMap') currentSubMap:any;
    @Input('currentData') currentData:any;

    public data:Array<Object>;

    ngOnChanges() {

        if (!isBlank(this.map)) {
            this.data = this.currentData[0].data;
        }

    }
}
