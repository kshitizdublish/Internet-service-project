import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class ConnectivityService implements Iservices {

	constructor(private _http: Http, ) { }
	turl = 'http://10.16.70.83:8090/apigateway';

	getVirtualRoutersData() {
		// const tname = 'happy01';
		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/virtualrouters';
		// const path = turl + '/tenants/' + tname + '/virtualrouters';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				let data: any;
				try {
					data = JSON.parse(res._body);
				} catch (e) { data = null; }
				return data;
			});
	}
	getCPEData() {
		// const tname = 'happy01';
		// const turl = 'http://10.16.70.83:8090/apigateway';

		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/cpes';
		// const path = turl + '/tenants/' + tname + '/cpes';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				let data: any;
				try {
					data = JSON.parse(res._body);
				} catch (e) { data = null; }
				return data;
			});
	}
	getVLANData() {
		// const tname = 'happy01';
		// const turl = 'http://10.16.70.83:8090/apigateway';

		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/vlans';
		// const path = turl + '/tenants/' + tname + '/vlans';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				let data: any;
				try {
					data = JSON.parse(res._body);
				} catch (e) { data = null; }
				return data;
			});
	}
	getSubnetData() {
		// const tname = 'happy01';
		// const turl = 'http://10.16.70.83:8090/apigateway';

		const tname = String(AppConfigs.clientList[ AppConfigs.selectedClientIndex ].tenantName);
		const path = AppConfigs.env.apiURL + '/tenants/' + tname + '/subnets';
		// const path = turl + '/tenants/' + tname + '/subnets';
		return this._http.get(path, AppConfigs.headerOptions)
			.map((res: any) => {
				let data: any;
				try {
					data = JSON.parse(res._body);
				} catch (e) { data = null; }
				return data;
			});
	}

	catchError(error: any): any {
		this.unAuthorised();
		return error;
	}

	unAuthorised() {
		AppConfigs.clearAuth();
	}
}
