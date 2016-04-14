// app/atexo/common/pipe/atexo/atexo-timestamp-to-date.pipe.ts
/**
 *
 * @name atexo-timestamp-to-date.pipe.ts
 *
 */

import {Pipe, PipeTransform} from 'angular2/core';
import {isString, isNumber } from 'angular2/src/facade/lang';
/*
 * Convert timestamp to Date
 * Usage:
 *   value | toDate
 * Example:
 *   {{ 1409011200 |  toDate}}
 *   formats to: 'Tue Aug 26 2014 02:00:00 GMT+0200 (Paris, Madrid (heure d’été))'
 */
@Pipe({name: 'toDate'})
export class ToDatePipe implements PipeTransform {
    transform(value:number):any {
        if (isNumber(value)) {
            return new Date(value * 1000);
        } else {
            if (isString(value)) {
                return new Date(value);
            }
        }

    }
}