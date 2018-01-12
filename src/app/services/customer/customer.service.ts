import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class CustomerService implements Iservices {

  constructor(private _http: Http, ) { }

  getCustomerList() {
    const path = AppConfigs.env.apiURL + '/user/accounts/?sessionid=' + AppConfigs.sessionId;
    return this._http.get(path, AppConfigs.headerOptions)
      .map((res: any) => {
        return JSON.parse(res._body);
      });
  }

  addCustomer(formData) {
    // TODO: need change middle ware call
    const path = AppConfigs.env.apiURL + '/user/accounts/?sessionid=' + AppConfigs.sessionId;
    return this._http.get(path, AppConfigs.headerOptions)
      .map((res: any) => {
        return JSON.parse(res._body);
      });
  }

  catchError(error: any): any {
  }

  unAuthorised() {
  }
}
