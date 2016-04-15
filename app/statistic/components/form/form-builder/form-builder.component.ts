import {Component, Input, View, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {isPresent, isBlank} from 'angular2/src/facade/lang';
import {FormControl} from '../form-control/form-control.componenet';
import {Value} from '../../../class/index';

@Component({
    selector: 'form-builder'
})

@View({
    template: `
        <form (ngSubmit)="onSubmit()" #form="ngForm" name="form-filter">
            <fieldset>
                <form-control *ngFor="#element of elements" [element]="element" [data]="data[element.name]" [log]="true"></form-control>
                <div class="pure-controls">
                    <button type="submit" class="pure-button pure-button-primary">Submit</button>
                </div>
            </fieldset>
        </form>

        <div class="panel panel-default bloc-toggle panel-filtres">

            <div class="panel-heading">
                <h2 class="panel-title no-toggle">Rapports statistiques - Consultations</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal">
                    <div class="form-group form-group-sm">
                        <label class="col-xs-2 control-label" for="achats_requetes">Objet du rapport</label>
                        <div class="col-xs-8">
                            <select data-placeholder="Selectionnez..." class="referentiels-longInput chosen-select" title="Requêtes" id="achats_requetes">
                                <option>Suivi des consultations</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <div class="separator"></div>

            <div class="panel-heading" id="headingRequete">
                <h3 class="panel-title"><a data-toggle="collapse" href="#collapseRequete" aria-expanded="false"
                aria-controls="collapseRequete" class="collapsed"><i class="fa"></i>Entités de référence</a></h3>
            </div>
            <div id="collapseRequete" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingRequete">
                <div class="panel-body">

                    <form class="form-horizontal">
                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label" for="pouvoirAdjudicateur">Pouvoir adjudicateur</label>
                            <div class="col-xs-8">
                            	<p class="form-control-static">Ville de Paris</p>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label" for="dirService">Direction</label>
                            <div class="col-xs-8">
                            	<p class="form-control-static">Bureau du Courrier</p>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label" for="services">Services</label>
                            <div class="col-xs-8">
                                <p class="form-control-static">Mon service</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="separator"></div>
            <div class="panel-heading" id="headingFiltres">
                <h3 class="panel-title"><a data-toggle="collapse" href="#collapseFiltres" aria-expanded="false" aria-controls="collapseFiltres" class="collapsed"><i class="fa"></i>Filtrer par</a></h3>
            </div>
            <div id="collapseFiltres" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFiltres">
                <div class="panel-body">
                    <form class="form-horizontal">

                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label" for="periode">Période</label>
                            <div class="col-xs-8">
                                <input type="text" id="periode" class="form-control input-sm daterange" />
                                <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label">Type de contrat</label>
                            <div class="col-xs-8">
                                <div class="btn-group btn-statut" data-toggle="buttons">
                                    <label class="btn btn-default active"><input type="checkbox" id="contrat_type_01" checked>Marché</label>
                                    <label class="btn btn-default"><input type="checkbox" id="contrat_type_02">AAC</label>
                                    <label class="btn btn-default"><input type="checkbox" id="contrat_type_03">DSP</label>
                                    <label class="btn btn-default"><input type="checkbox" id="contrat_type_05">SAD</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label" for="typeProcedure">Type de procédure</label>
                            <div class="col-xs-8">
                                <select class="form-control chosen-select" id="typeProcedure" multiple data-placeholder="Tous">
                                    <option value="1">AOO</option>
                                    <option value="2">AOO MOE</option>
                                    <option value="3">AOR</option>
                                    <option value="4">AOR MOE</option>
                                    <option value="25">Appel d'offre ouvert (2016)</option>
                                    <option value="5">Article 30 avec publicité</option>
                                    <option value="6">Concours restreint</option>
                                    <option value="20">DSP restreinte</option>
                                    <option value="7">Dialogue compétitif</option>
                                    <option value="10">MAPA sans pub sans concurrence</option>
                                    <option value="8">MAPA sans publicité ouvert</option>
                                    <option value="9">MAPA sans publicité restreint</option>
                                    <option value="24">MAPA services sociaux et services spécifiques</option>
                                    <option value="13">MN avec pub et avec conc </option>
                                    <option value="14">MN sans pub avec conc</option>
                                    <option value="15">MN sans pub sans conc</option>
                                    <option value="12">Marché Adapté avec publicité restreint</option>
                                    <option value="11">Marché adapté avec publicité ouvert</option>
                                    <option value="17">Marché suite à&nbsp;accord cadre avec publicité</option>
                                    <option value="16">Marché suite à&nbsp;accord cadre avec publicité européenne</option>
                                    <option value="18">Marché&nbsp;suite à accord cadre sans publicité</option>
                                    <option value="23">Procédure concurrentielle avec négociations</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-xs-2 control-label">Nature des prestations</label>
                            <div class="col-xs-8">
                                <div class="btn-group btn-statut" data-toggle="buttons">
                                    <label class="btn btn-default active"><input type="checkbox" id="nature_prestation_01" checked>Travaux</label>
                                    <label class="btn btn-default active"><input type="checkbox" id="nature_prestation_02" checked>Fourniures</label>
                                    <label class="btn btn-default active"><input type="checkbox" id="nature_prestation_03" checked>Services</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-group-sm voffset3">
                            <label class="col-xs-2 control-label" for="statutConsultation">Statut des consultations</label>
                            <div class="col-xs-8">
                                <select title="Statut des consultations" id="statutConsultation" class="chosen-select" multiple data-placeholder="Tous">
                                    <option>Définition</option>
                                    <option>Publicité</option>
                                    <option>Consultation</option>
                                    <option>Dépouillement</option>
                                    <option>Attribution</option>
                              </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    `,
    directives: [FormControl]
})

export class FormBuilder {
    @Input('elements') elements:any;
    @Output('submitFormEvent') submitFormEvent = new EventEmitter();

    private data:Object;

    constructor() {
        this.data = new Object;
    }

    ngOnInit() {
        this.buildElements();
    }

    ngOnChanges() {
        if (!isBlank(this.elements)) {
            this.buildElements();
            this.bindingForm();
        }
    }

    private buildElements() {
        this.data = new Object;
        this.elements.forEach(element => {
            this.data[element.id] = new Value(element.default);
            //this.data[element.id] = element.default;
        });
    }

    private onSubmit() {
        this.bindingForm();
        return false;
    }

    private bindingForm() {
        this.submitFormEvent.emit({
            data: this.data
        });
        return false;
    }
}