import {Injectable} from 'angular2/core';
import {Http, RequestOptions, Request, RequestMethod, URLSearchParams} from 'angular2/http';
import {Util} from '../../../app/atexo/common/services/atexo.service';
import {isPresent, isBlank} from 'angular2/src/facade/lang';


@Injectable()
export class HttpProvider {
    http:Http;
    search:any;

    constructor(http:Http) {
        this.http = http;
    }

    getRequest(_url:string, _search?:Object, _header?:Object) {
        var options = new RequestOptions({
            method: RequestMethod.Get,
            headers: Util.getInstance().requestHeader().setHeaderParams(_header),
            url: _url,
            search: Util.getInstance().urlParams().parse(_search)
        });
        var req = new Request(options);
        return this.http.request(req);
    }

    getBiRequest(_url:string, _search?:Object, _header?:Object) {
        return this.getRequest(_url, _search, _header);
    }


}