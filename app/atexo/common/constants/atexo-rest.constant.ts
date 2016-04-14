// app/atexo/common/constants/atexo/atexo-rest.constant.ts
/**
 *
 * @name atexo-rest.constant.ts
 *
 */

import {RequestMethod} from '../../../../node_modules/angular2/http.d.ts';
import {RequestUrlType} from './atexo-enum.constant.ts';

export var AtexoRestConstant = {

    baseUrl: 'http://localhost:5600/',
    _format: 'json',
    request: {
        panel: {
            all: {
                method: RequestMethod.Get,
                header: {},
                url: 'panel',
                type: RequestUrlType.Relative,
                _format: 'json',
                parameter: {
                    limit: 5,
                    offset: 0
                }
            },
            byId: {
                method: RequestMethod.Get,
                url: 'panel',
                type: RequestUrlType.Relative
            }
        },
        alert: {
            all: {
                method: RequestMethod.Get,
                header: {},
                url: 'alert',
                type: RequestUrlType.Relative,
                _format: 'json',
                parameter: {
                    limit: 5,
                    offset: 0
                }
            }
        },
        news: {
            all: {
                method: RequestMethod.Get,
                header: {},
                url: 'news',
                type: RequestUrlType.Relative,
                _format: 'json',
                parameter: {
                    limit: 5,
                    offset: 0
                }
            },
            byId: {
                method: RequestMethod.Get,
                header: {},
                url: 'news',
                type: RequestUrlType.Relative
            }
        }
    }
};

