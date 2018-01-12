import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Iservices } from '../Iservices.service';
import { RbaService } from '../rba/rba.service';

@Injectable()
export class ValidateService implements Iservices {

	constructor(private _http: Http, private _customEvents: CustomEvents, private _rba: RbaService) {
	}

	validateSession(): any {
		this._customEvents.showHideLoader.emit({ show: true });
		if (AppConfigs.sessionId) {
			const path = AppConfigs.env.apiURL + '/user/validate';

			return this._http.post(path, AppConfigs.sessionId, AppConfigs.headerOptions)
			.map((res: any) => {
				this._customEvents.showHideLoader.emit({ show: false });

				const responseObj = JSON.parse(res._body);
				AppConfigs.sessionId = responseObj.sessionId;

				// save the username in app.config
				AppConfigs.currentUser = responseObj;

				// temporary RBA call
				this._rba.getRBA().subscribe( (val: any) => {
					AppConfigs.setRBA = val;
				});

				if (!AppConfigs.isValidSession) {
					AppConfigs.isValidSession = true;
					this._customEvents.authValidateComplete.emit({});
				}
				return true;
			})
			.catch((error: any) => this.catchError(error));

		} else {
			this._customEvents.unAuthorizedError.emit({});
			this._customEvents.showHideLoader.emit({ show: false });
			return true;
		}


	}

	catchError(error: any): any {
		this.unAuthorised();
		return true;
	}

	unAuthorised() {
		AppConfigs.clearAuth();
		location.reload();
	}






}
