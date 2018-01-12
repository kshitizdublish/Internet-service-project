import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConfigs } from '../../common/app.config';

@Injectable()
export class RbaService {

  constructor(private _http: Http) { }

  getRBA() {
    const path = './spoof/rba.json?cache=' + String( (Math.random() * 1000) + Date.now() );
    return this._http.get(path, AppConfigs.headerOptions)
    .map( (resp: any) => {
      return JSON.parse( resp._body);
    } );
  }

}
