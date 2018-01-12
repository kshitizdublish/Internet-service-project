import { Component, OnInit } from '@angular/core';
import { AppConfigs } from '../../../common/app.config';
import { CustomEvents } from '../../../events/customevents';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	userName: 'User';

	constructor(private _customEvents: CustomEvents) {
		this.userName = AppConfigs.currentUser.name;
	}

	ngOnInit() {
	}

	onClickLogOut() {
		this._customEvents.showAlertModalEvt.emit({ show: false, heading: '', bodyText: '' });
		AppConfigs.clearAuth();
		this._customEvents.unAuthorizedError.emit({});
		this._customEvents.showHideLoader.emit({ show: false });
	}

}
