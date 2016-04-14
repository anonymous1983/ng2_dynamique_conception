import {Component, Input, View} from 'angular2/core';
import {isPresent, isBlank} from 'angular2/src/facade/lang';

@Component({
    selector: '.main-component',
    template: `
        <table class="table">
            <thead>
                <tr>
                    <th>Numéro consultation</th>
                    <th>Intitulé Consultation</th>
                    <th>Statut</th>
                    <th>Numéro Lot</th>
                    <th>Intitulé Lot</th>
                    <th>Date Lancement</th>
                    <th>Date Notification</th>
                    <th>Date Attribution</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#item of data; #i = index">
                    <td>{{item.numero_consultation}}</td>
                    <td>{{item.intitule_consultation}}</td>
                    <td>{{item.statut_consultation}}</td>
                    <td>{{item.numero_lot}}</td>
                    <td>{{item.intitule_lot}}</td>
                    <td>{{item.lancement_date_reelle}}</td>
                    <td>{{item.notification_date_reelle}}</td>
                    <td>{{item.attribution_date_reelle}}</td>
                </tr>
            </tbody>
        </table>
    `,
    directives: []
})
export class Main {
    @Input('map') map:any;
    @Input('currentMap') currentMap:any;
    @Input('currentData') currentData:any;

    public data:Array<Object>;

    ngOnChanges() {
        if (!isBlank(this.map)) {
            console.log(this.map);
            console.log(this.currentData);
            this.data = this.currentData[0].data;
        }

    }
}
