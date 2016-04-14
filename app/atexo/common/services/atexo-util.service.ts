// app/atexo/common/services/atexo/atexo-util.service.ts
/**
 *
 * @name atexo-util.service.ts
 *
 */

import {Injectable} from 'angular2/core';
import {URLSearchParams, Headers} from 'angular2/http';
import {isPresent, isJsObject} from 'angular2/src/facade/lang';

@Injectable()
export class Util {
    static instance:Util;
    static isCreating:Boolean = false;

    constructor() {
        if (!Util.isCreating) {
            throw new Error('[Util] You can\'t call new in Singleton instances!');
        }
    }

    static getInstance() {
        if (Util.instance == null) {
            Util.isCreating = true;
            Util.instance = new Util();
            Util.isCreating = false;
        }
        return Util.instance;
    }

    /**
     *
     * @private requestOptions
     * @name requestOptions
     * @description new instance of requestOptions class
     * @returns requestOptions{Object}
     */
    requestOptions() {
        return new RequestOptions();
    }

    /**
     *
     * @private urlParams
     * @name urlParams
     * @description new instance of urlParams class
     * @returns urlParams{Object}
     */
    urlParams() {
        return new URLParams();
    }

    /**
     *
     * @private requestHeader
     * @name requestHeader
     * @description new instance of requestHeader class
     * @returns requestHeader{Object}
     */
    requestHeader() {
        return new RequestHeader();
    }

    /**
     *
     * @private arrayObjectFindIndex
     * @name arrayObjectFindIndex
     * @description Find object in array object
     * @param arr<Array>
     * @param callback<function>
     * @returns index{number}
     */
    arrayObjectFindIndex(arr:Array<any>, callback) {
        let len:number = arr.length,
            index:number,
            i:number;

        for (i = 0; i < len; i++) {
            var e = arr[i];
            if (callback(e)) {
                index = i;
            }
        }
        if (index === undefined) {
            index = -1;
        }
        return index;
    }

    /**
     *
     * @private newArray
     * @name newArray
     * @description Create New Table with many lendth items and value equal to default Value
     * @param length<number>
     * @param defaltValue<any>
     * @returns arr{Array<any>}
     */
    newArray(length:number, defaultValue?:any) {
        let i:number = 0,
            _defaultValue:any = 0,
            arr:Array<any> = new Array(length);

        if (isPresent(defaultValue)) {
            _defaultValue = defaultValue;
        }
        for (i; i < length; i++) {
            arr[i] = _defaultValue;
        }
        return arr;
    }
}


class RequestOptions {

    searchParams:URLSearchParams;

    constructor() {
        this.searchParams = new URLSearchParams();
    }

    setSearchParams(data?:Object):URLSearchParams {
        if (!isPresent(data)) {
            return;
        } else {
            if (isJsObject(data)) {
                for (var item in data) {
                    if (data.hasOwnProperty(item)) {
                        this.searchParams.set(item, data[item]);
                    }
                }
            }
            return this.searchParams;
        }
    }
}


class URLParams {

    private params:URLSearchParams;

    constructor() {
        return this;
    }

    parse(_params?:Object) {
        let params:URLSearchParams = new URLSearchParams();
        if (isPresent(_params)) {
            //this.params = new URLSearchParams();
            for (var k in _params) {
                if (_params.hasOwnProperty(k)) {
                    params.set(k, _params[k]);
                }
            }
            this.params = params;
        }
        return this.params;
    }

}

class RequestHeader {

    header:Headers;

    constructor() {
        this.header = new Headers();
    }

    setHeaderParams(data?:Object):Headers {
        if (!isPresent(data)) {
            return;
        } else {
            if (isJsObject(data)) {
                for (var item in data) {
                    if (data.hasOwnProperty(item)) {
                        this.header.append(item, data[item]);
                    }
                }
            }
            return this.header;
        }
    }
}
