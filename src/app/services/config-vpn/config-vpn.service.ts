import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class ConfigVpnService implements Iservices {

    constructor(private _http: Http,
        private _customEvents: CustomEvents) {
    }

    requestConfigVPN(values) {
        const path = AppConfigs.env.login + 'rest/local-site/v3/sites';
        const options = new RequestOptions({ headers: AppConfigs.headerOptions });
        const body = {
            'tenantId': '49cb4f2c56af4413b8b1a1bdd8c3d806', // TODO by middleware
            'vpnName': values.vpnName,
            'description': values.description,
            'selectSite': values.selectSite,
            'selectLayer': values.selectLayer,
            'topologyType': values.topologyType
        };

        return this._http.post(path, JSON.stringify(body), options)
            .map((res: any) => {
                return res;
            });

    }

    catchError(error: any): any {
        return error;
    }

    unAuthorised() {
        AppConfigs.clearAuth();
        this._customEvents.unAuthorizedError.emit({});
    }

}
