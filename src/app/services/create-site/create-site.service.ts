import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class CreateSiteService implements Iservices  {

    constructor(private _http: Http) { }

    requestCreateSite(values) {
        const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
        const path = AppConfigs.env.apiURL + '/configure';
        const body = this.generateBody(values, tname);

        return this._http.post(path, JSON.stringify(body), AppConfigs.headerOptions)
            .map((res: any) => {
                return res;
            });

    }

    requestUpdateSite(values) {
        const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
        const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/sites';
        const body = {
            'name': values.name,
            'description': values.description,
            'wanAccessType': values.wanAccessType,
            'localCpeType': values.csrType,
            'location': values.location,
            'areaname': values.area
        };

        return this._http.post(path, JSON.stringify(body), AppConfigs.headerOptions)
            .map((res: any) => {
                return res;
            });

    }

    generateBody( _body: any, tname: string ) {
        const body = {
            account_id: '',
            tenant_id: tname,
            object: 'ordersite',
            operation: 'create',
            path_parameters: {},
            payload: {
                name: _body.name,
                location: _body.location,
                cpeType: _body.cpeType,
                primaryAccessType: _body.primaryAccessType,
                primaryAccessNetwork: _body.primaryAccessNetwork,
                backupAccessType: _body.backupAccessType,
                backupAccessNetwork: _body.backupAccessNetwork,
                qosType: _body.qosType,
                description: _body.description
            }
        };
        return body;
    }

    catchError(error: any): any {
    }

    unAuthorised() {
    }

}
