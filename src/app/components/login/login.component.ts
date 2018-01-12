import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';

import { ValidateService } from '../../services/session/validate.service';
import { LoginService } from '../../services/login/login.service';
import { CustomEvents } from '../../events/customevents';
import { DataObjectUtils } from '../../utils/DataObjectUtils';
import { AppConfigs } from '../../common/app.config';
import { User } from '../../vo/users/User';
import { RbaService } from '../../services/rba/rba.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginErrorMsg = '';
	loginForm: FormGroup;

	constructor(
		fb: FormBuilder,
		private _loginService: LoginService,
		private _customEvents: CustomEvents,
		private translate: TranslateService,
		private _rba: RbaService
	) {

		this.loginForm = fb.group({
			'userName': ['', Validators.required],
			'password': ['', Validators.required],
		});
	}

	ngOnInit() { }

	/**
	 * login button clicked call submitForm function
	 * */
	submitForm(value: any, evt) {
		// validate the mandatory fields
		if (!evt.target.checkValidity() && value.userName === '') {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => { this.loginErrorMsg = res; });
			return;
		}
		if (value.userName !== '') {
			if (DataObjectUtils.validateUserName(value.userName)) {
				this.loginErrorMsg = '';
			} else {
				this.translate.get('Login.invalidUserName').subscribe((res: string) => { this.loginErrorMsg = res; });
				return;
			}
		}

		// remove the white spaces from input values
		DataObjectUtils.stripWhiteSpace(value);
		const form = {
			'name': value.userName,
			'password': value.password
		};

		this._customEvents.showHideLoader.emit({ show: true });
		// get the token from Token service
		this._loginService.requestLogin(form).subscribe((response: any) => {
			const responseObj = JSON.parse(response._body);
			AppConfigs.sessionId = responseObj.sessionId;

			// save the username in app.config
			AppConfigs.currentUser = responseObj;
			// temporary RBA call
			this._rba.getRBA().subscribe( (val: any) => {
				AppConfigs.setRBA = val;
			});

			AppConfigs.isValidSession = true;
			this._customEvents.showHideLoader.emit({ show: false });
			this._customEvents.routToDashBoard.emit({});

		}, (error: any) => {
			this._customEvents.showHideLoader.emit({ show: false });
			this.loginErrorMsg = AppConfigs.errorCodeHandler( error.status, this.translate, this._customEvents, 'requestLogin' );
		});

	}

	// Forgot Passowrd
	forgotPassword() { }

	// Learn
	onClickLearn() { }

	// View Demo
	onClickDemo() { }

}
