import { Injectable } from '@angular/core';
import { AppConfigs } from '../../common/app.config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CreateInternetAccessService {

  constructor(
      private _http: Http
  ) { }

  requestCreateInternetAccess(formData: any) {
    const tenantName = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
    const path = AppConfigs.env.apiURL + '/configure';
    const requestParams = this.getRequestParams(tenantName, formData);

    return this._http.post(
        path,
        requestParams,
        AppConfigs.headerOptions
    ).map( (res) => res.json() );

  }

  getRequestParams(tenantName: any, formData: any) {
    const requestParams = {
        'account_id': '',
        'tenant_id': tenantName,
        'object': 'orderinternetaccess',
        'operation': 'create',
        'path_parameters': {},
        'payload': {
            'name': formData.accessName,
            'siteId': formData.siteId,
            'allocationQuantity': formData.allocationQuantity,
            'featureList': [
                {
                    'id': 'DDoS',
                    'parameters': {
                        'ddosDeployment': formData.ddosDeployment
                    }
                }
            ]
        }
    };

    return requestParams;
  }
}
