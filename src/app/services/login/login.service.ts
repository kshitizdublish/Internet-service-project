import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';

@Injectable()
export class LoginService implements Iservices {
	auth_token: string;

	constructor(private _http: Http,
		private _customEvents: CustomEvents) {
	}

	requestLogin(value) {
		const path = AppConfigs.env.apiURL + '/user/login';
		const sbody = { user_name: value.name, password: value.password};

		return this._http.post(path, JSON.stringify(sbody), AppConfigs.loginHeaderOptions)
			.map((res: any) => {
				return res;
			});
	}

	catchError(error: any): any {
		this.unAuthorised();
		return error;
	}

	unAuthorised() {
		AppConfigs.clearAuth();
		this._customEvents.unAuthorizedError.emit({});
	}

}
