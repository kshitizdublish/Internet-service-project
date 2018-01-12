import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class StatisticsService implements Iservices {

    constructor(private _http: Http) {
    }

    requestAllStatistics() {
        const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
        const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/stats';

        return this._http.get(path, AppConfigs.headerOptions)
            .map((res: any) => {
                return res;
            });
    }

    catchError(error: any): any {
    }

    unAuthorised() {
    }

}
