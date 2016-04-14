import {Component, View} from 'angular2/core';
import { Statistic } from './statistic/statistic.component';

var W:any = window;

@Component({
    selector: 'app'
})
@View({
    template: '<statistic [config]="configuration"></statistic>',
    directives: [Statistic]
})
export class AppComponent {
    public configuration:Object;

    constructor() {
        this.configuration = {
            json: {
                config: 'src/mocks/config.json'
            }
        };
    }
}