// app/atexo/common/pipe/atexo/atexo-trancate.pipe.ts
/**
 *
 * @name atexo-trancate.pipe.ts
 *
 */

import {Pipe, PipeTransform} from 'angular2/core';
import {isPresent } from 'angular2/src/facade/lang';
/*
 * Truncates multi-line text (no HTML)
 * Takes an exponent argument that defaults to 100.
 * Usage:
 *   value | trancate:exponent
 * Example:
 *   {{ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' |  trancate:10}}
 *   formats to: 'Lorem ipsu...'
 */
@Pipe({name: 'trancate'})
export class TrancatePipe implements PipeTransform {
    length:number;
    placeholderEnd:string;

    transform(value:string, args:any[]):any {
        this.length = isPresent(args[0]) ? args[0] : 100;
        this.placeholderEnd = (value.length < this.length) ? '' : isPresent(args[1]) ? args[1] : ' ...';
        return value.substring(0, this.length).concat(this.placeholderEnd);
    }
}