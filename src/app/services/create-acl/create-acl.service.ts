import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';
import { Acl } from '../../vo/acl/acl';

@Injectable()
export class CreateAclService implements Iservices {

    constructor(private _http: Http) { }

    requestCreateAcl(values) {
        const tname = String(AppConfigs.clientList[AppConfigs.selectedClientIndex].tenantName);
        const path = AppConfigs.env.apiURL + '/configure';
        const body = this.generateBody(values, tname);

        return this._http.post(path, JSON.stringify(body), AppConfigs.headerOptions)
            .map((res: any) => {
                return res;
            });

    }

    generateBody(_body: any, tname: string) {
        const _rules = [];
        _body.rules.forEach(element => {
            const obj: any = {};
            obj.ruleNumber = element.ruleNumber;
            obj.isEgress = element.direction;
            obj.description = '';
            obj.cidrBlock = element.cidrBlock;
            obj.cidrType = element.cidrType;
            obj.protocol = element.protocol;
            obj.portRange = element.portRange;
            obj.ruleAction = element.action;
            _rules.push(obj);
        });

        const body = {
            account_id: '',
            tenant_id: tname,
            object: 'acl',
            operation: 'create',
            path_parameters: {},
            payload: {
                networkAcl: {
                    name: _body.name,
                    description: _body.description,
                    siteId: _body.siteId.id,
                    ipProtocol: _body.ipProtocol
                },
                rules: _rules
            }

        };
        return body;
    }

    catchError(error: any): any {
    }

    unAuthorised() {
    }

}
