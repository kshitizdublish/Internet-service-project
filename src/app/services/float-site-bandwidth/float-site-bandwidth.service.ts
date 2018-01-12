import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class FloatSiteBandwidthService implements Iservices {

  constructor(private _http: Http, ) { }

  getSiteBandwidthInfo() {
    const path = './spoof/site-bandwidth.json';
    // const path = AppConfigs.env.apiURL +"/tenants/test02/metrics/bandwidth";
    return this._http.get(path, AppConfigs.headerOptions)
      .map((res: any) => {
        return JSON.parse(res._body);
      })
      .catch((error: any) => this.catchError(error));
  }

  catchError(error: any): any {
    this.unAuthorised();
    return error;
  }

  unAuthorised() {
    AppConfigs.clearAuth();
  }

}
