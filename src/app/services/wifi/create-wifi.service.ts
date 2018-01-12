import { Injectable } from '@angular/core';
import { AppConfigs } from '../../common/app.config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CreateWifiService {

    constructor(
        private _http: Http
    ) { }

    requestCreateWifi(formData: any, siteId: any) {
        const tenantName = String(AppConfigs.clientList[AppConfigs.selectedClientIndex].tenantName);
        const path = AppConfigs.env.apiURL + '/tenants/' + tenantName + '/wifitemplates/sites/' + siteId;
        const requestParams = this.getRequestParams(formData);

        return this._http.post(
            path,
            requestParams,
            AppConfigs.headerOptions
        ).map((res) => {
            return res;
        });
    }

    getRequestParams(formData: any) {
        const requestParams = {
            'name': formData.name,
            'countryCode': formData.countryCode,
            'isDefault': 'false',
            'ssids': []
        };

        formData.wifiRules.forEach((rule) => {
            const ssid = this.getSsidBody( rule);
            const ssidObj = ssid;

            ssidObj.vlanId = parseInt(rule.vlanId, 10);
            ssidObj.name = rule.ssidName;
            ssidObj.type = rule.type;
            ssidObj.relativeRadios.push(rule.relativeRadios);
            ssidObj.ssidAuth.pskEncryptType = rule.pskEncriptionType;
            ssidObj.ssidAuth.securityKey = rule.securityKey;

            requestParams.ssids.push(ssidObj);
        });

        return requestParams;
    }

    getSsidBody( rule ) {
        const ssid = {
            'name': 'ssid_name',
            'type': 'guest',
            'enable': true,
            'vlanId': 1001,
            'hidedEnable': false,
            'relativeRadios': [],
            'ssidAuth': {
                'mode': 'open',
                'pskEncryptType': null,
                'securityKey': null,
            }
        };
        return ssid;
    }

    getVlanOptions(siteId: any) {
        const tenantName = String(AppConfigs.clientList[AppConfigs.selectedClientIndex].tenantName);
        const path = AppConfigs.env.apiURL + '/tenants/' + tenantName + '/vlans?siteId=' + siteId;

        return this._http.get(
            path,
            AppConfigs.headerOptions
        ).map((res) => res.json());
    }
}
