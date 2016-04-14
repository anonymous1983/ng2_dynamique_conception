import {Injectable} from 'angular2/core';
import {Http, RequestOptions, Request, RequestMethod, URLSearchParams} from 'angular2/http';
import {Util} from '../../../app/atexo/common/services/atexo.service';


@Injectable()
export class FormFilterProvider {
    http:Http;
    search:any;

    constructor(http:Http) {
        this.http = http;
    }

    all(_url:string, _search?:Object) {
        var options = new RequestOptions({
            method: RequestMethod.Get,
            url: _url,
            search: Util.getInstance().urlParams().parse(_search)
        });
        var req = new Request(options);
        return this.http.request(req);
    }

}