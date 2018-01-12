import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class NetworkService implements Iservices {

	constructor(private _http: Http, ) { }

	getIpvpnData() {
		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/ipvpn';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				return JSON.parse(res._body);
			});
	}

	getQoSData() {
		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/qos';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				return JSON.parse(res._body);
			});
	}

	getPublicIPData() {
		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/publicip';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				return JSON.parse(res._body);
			});
	}

	getGatewayData() {
		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/internetgateway';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				return JSON.parse(res._body);
			});
	}
	// TODO: need it for later
	// getRAccessData() {
	// 	const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
	// 	const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/raccess';
	// 	return this._http.get(path, AppConfigs.headerOptions)
	// 		.map((res: any) => {
	// 			return JSON.parse(res._body);
	// 		});
	// }

	getRemoteAccessData() {
		 const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
         const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/remoteaccess';
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
