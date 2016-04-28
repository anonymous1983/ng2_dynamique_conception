import {Component, Input, View} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS, Http, RequestOptions, Request, Response, RequestMethod} from 'angular2/http';
import {isPresent, isJsObject, isBlank} from 'angular2/src/facade/lang';

import {Main, SideBarLeft, NavBar, FormBuilder} from './components/index';

import {Value} from './class/index';
import {HttpProvider} from './providers/index';
import {ValueService} from './services/index';

@Component({
    selector: '.statistic-component',
    providers: [HttpProvider]
})

@View({
    template: `

    <div class="left-part" id="left-part" *ngIf="map">
        <div class="sidebarleft-component" [obj]="map" (clickItemEvent)="selectMap($event)"></div>
    </div>

    <div class="main-part" *ngIf="currentMap">

        <div class="breadcrumbs">Statistiques > Rapports > Consultations </div>

        <div class="panel panel-default bloc-toggle panel-filtres">

            <div class="panel-heading">
                <h2 class="panel-title no-toggle">Rapports statistiques - Consultations</h2>
            </div>

            <div class="panel-body">
                <div class="navbar-component" [obj]="currentMap" (changeItemEvent)="selectSubMap($event)"></div>
            </div>


            <div class="form-builder-component"
                                *ngIf="formElements"
                                [formElements]="formElements"
                                [referential]="referential"
                                (bindingFormEvent)="onSubmit($event)"></div>


        </div>

        <div class="main-component" *ngIf="currentData" [map]="map" [currentMap]="currentMap" [currentSubMap]="currentSubMap.item" [currentData]="currentData"></div>

    </div>`,
    directives: [SideBarLeft, NavBar, Main, FormBuilder]
})
export class Statistic {
    @Input('config') config:any;

    private httpProvider:HttpProvider;

    public referential:Object;
    public map:Array<Object>;
    public elements:Array<any>;
    public formElements:Array<any>;
    public fieldsets:Array<any>;
    public currentMap:Object;
    public currentSubMap:Object;
    public currentData:Object;
    public dataUrl:Object;

    constructor(httpProvider:HttpProvider) {

        this.httpProvider = httpProvider;

        this.httpProvider.getBiRequest('/bi/rest_v2/reports/reports/RSEM___Rapports_module_stats/RSEM_DonneesReferentielles.json').subscribe(
            (res:Response) => {
                this.referential = res.json();
                this.getMap();
                //console.log(this.referential);
            },
            ((err:Response) => {
                if (err.status === 404 || err.status === 401) {
                    console.log(err);
                }
            })
        );
    }

    ngAfterViewInit() {
        console.log(this);
    }

    private getMap() {
        this.httpProvider.getRequest('/src/mocks/map.json').subscribe(// Http Success
            (res:Response) => {

                if (res.status === 200) {
                    if (res.text() !== '') {
                        this.map = res.json();
                        this.currentMap = this.map[0];
                        this.currentSubMap = {};
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

    public selectMap(e:any) {
        this.currentMap = e.item;
    }

    public selectSubMap(e:any) {
        this.currentSubMap = e;

        this.httpProvider.getRequest(e.item.config.filterUrl).subscribe((res:Response) => {

            if (res.status === 200) {
                this.formElements = res.json();
                this.elements = res.json();
            }

        });
    }

    public bindingForm(e:any) {
        this.dataUrl = e.data;
    }

    public onSubmit(e:any) {
        console.log('--------------------');
        console.log(e.data);

        this.httpProvider.getRequest(
            this.currentSubMap['item'].config.form.action,
            ValueService.getInstance().toRequest(e.data),
            this.currentSubMap['item'].config.form.header).subscribe(
            // Http Success
            (res:Response) => {

                if (res.status === 200) {
                    this.currentData = (res.text() !== '') ? res.json() : [{data: new Array(), group: new Array()}];
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

