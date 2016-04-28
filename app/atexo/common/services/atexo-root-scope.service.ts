// app/atexo/common/services/atexo/atexo-root-scope.service.ts
/**
 *
 * @name atexo-root-scope.service.ts
 *
 */

import {Injectable} from 'angular2/core';

@Injectable()
export class $rootScope {

    public scope:Object;

    constructor() {
        //this.scope = new Object();
        this.scope = {
            'id': 12
        }
    }

    public setScope(obj:any) {
        Object.defineProperties(this.scope, obj);
    }

    public getScope() {
        return this.scope;
    }

}