import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class DynamicFormElementsService implements Iservices  {

    constructor(private _http: Http) { }

    requestFormElements() {
        // coutn will be always 0, as it's required for form only
        const tname = String(AppConfigs.clientList[ 0 ].tenantName);
        const path = AppConfigs.env.apiURL + '/libraries';

        return this._http.get(path, AppConfigs.headerOptions)
            .map((res: any) => {
                return JSON.parse(JSON.stringify(res).replace(/"\s+|\s+"/g, '"'));
            });

    }

    catchError(error: any): any {
    }

    unAuthorised() {
    }

}
