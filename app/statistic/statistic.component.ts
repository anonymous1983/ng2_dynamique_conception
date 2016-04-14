import {Component, Input, View} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS, Http, RequestOptions, Request, Response, RequestMethod} from 'angular2/http';
import {isPresent, isJsObject, isBlank} from 'angular2/src/facade/lang';

import {Main, SideBarLeft, NavBar, FormBuilder} from './components/index';

import {Value} from './class/index';
import {HttpProvider} from './providers/index';
import {ValueService} from './services/index'

@Component({
    selector: 'statistic',
    providers: [HttpProvider]
})

@View({
    template: `
    <div class="container row row-offcanvas row-offcanvas-right">
        <div class="row">
            <div class="col-xs-12 col-sm-2 sidebar-offcanvas" *ngIf="map">
                <div class="sidebarleft-component" [obj]="map" (clickItemEvent)="selectMap($event)"></div>
            </div>
            <div class="col-xs-12 col-sm-10 sidebar-offcanvas" *ngIf="currentMap">
                <div class="navbar-component" [obj]="currentMap" (changeItemEvent)="selectSubMap($event)"></div>
                <form-builder *ngIf="elements" [elements]="elements" (submitFormEvent)="submitForm($event)"></form-builder>
                <div class="main-component" *ngIf="currentData" [map]="map" [currentMap]="currentMap" [currentData]="currentData"></div>
            </div>
        </div>
    </div>`,
    directives: [SideBarLeft, NavBar, Main, FormBuilder]
})
export class Statistic {
    @Input('config') config:any;

    private httpProvider:HttpProvider;

    public referential:Array<any>;
    public map:Array<Object>;
    public elements:Array<any>;
    public currentMap:Object;
    public currentSubMap:Object;
    public currentData:Object;

    constructor(httpProvider:HttpProvider) {

        this.httpProvider = httpProvider;

        this.httpProvider.getRequest('/src/mocks/map.json').subscribe((res:Response) => {

            if (res.status === 200) {
                this.map = res.json();
                this.currentMap = this.map[0];
                this.currentSubMap = {};
            }

        });

    }

    public selectMap(e:any) {
        this.currentMap = e.item;
    }

    public selectSubMap(e:any) {
        this.currentSubMap = e;

        this.httpProvider.getRequest(e.item.config.filterUrl).subscribe((res:Response) => {

            if (res.status === 200) {
                this.elements = res.json();
            }

        });
    }

    public submitForm(e:any) {
        this.httpProvider.getBiRequest(this.currentSubMap['item'].config.form.action, ValueService.getInstance().toRequest(e.data), this.currentSubMap['item'].config.form.header).subscribe(
            // Http Success
            (res:Response) => {

                if (res.status === 200) {
                    if (res.text() !== '') {
                        this.currentData = res.json();
                    }
                }

            },
            // Http Error
            ((err:Response) => {
                if (err.status === 404 || err.status === 401) {
                    console.log(err);
                }
            })
        );


    }
}

