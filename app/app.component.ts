import {Component, View} from 'angular2/core';
import { Statistic } from './statistic/statistic.component';

var W:any = window;

@Component({
    selector: '.app-component'
})
@View({
    template: '<div class="statistic-component" [config]="configuration"></div>',
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