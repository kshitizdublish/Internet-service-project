import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class CreateVpnService implements Iservices  {

    constructor(private _http: Http,
        private _customEvents: CustomEvents) {
    }

    requestCreateVpn(values) {
        const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
        const path = AppConfigs.env.apiURL + '/configure';
        const body = this.generateBody(values, tname);
        return this._http.post(path, JSON.stringify(body), AppConfigs.headerOptions)
            .map((res: any) => {
                return res;
        });
    }
    generateBody( _body: any, tname: string) {
        const body = {
           account_id: '',
           tenant_id: tname,
           object: 'orderipvpn',
           operation: 'create',
           path_parameters: {},
           payload: {
                name: _body.vpnName,
                topology: _body.topology,
                siteinfoList: _body.siteinfoList,
                featureList: [],
            }
        };
        return body;
    }

    catchError(error: any): any {
    }

    unAuthorised() {
    }

}
