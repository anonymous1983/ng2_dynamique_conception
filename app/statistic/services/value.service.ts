import {Injectable} from 'angular2/core';
import {URLSearchParams, Headers} from 'angular2/http';
import {isPresent, isJsObject} from 'angular2/src/facade/lang';

@Injectable()
export class ValueService {
    static instance:ValueService;
    static isCreating:Boolean = false;

    constructor() {
        if (!ValueService.isCreating) {
            throw new Error('[Util] You can\'t call new in Singleton instances!');
        }
    }

    static getInstance() {
        if (ValueService.instance == null) {
            ValueService.isCreating = true;
            ValueService.instance = new ValueService();
            ValueService.isCreating = false;
        }
        return ValueService.instance;
    }

    /**
     *
     * @private toRequest
     * @name toRequest
     * @description convert Value to object can by send in Request
     * @param arr{Array<Value>}
     * @returns {Object}
     */
    toRequest(data?:Object) {

        let _data:Object = {};

        if (isJsObject(data)) {
            for (var item in data) {
                if (data.hasOwnProperty(item)) {
                    _data[item] = data[item].value;
                }
            }
        }

        return _data;
    }

}