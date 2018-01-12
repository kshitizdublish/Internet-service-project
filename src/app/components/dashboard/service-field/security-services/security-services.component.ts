import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomEvents } from '../../../../events/customevents';
import { AppConfigs } from '../../../../common/app.config';

@Component({
	selector: 'app-security-services',
	templateUrl: './security-services.component.html',
	styleUrls: ['./security-services.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SecurityServicesComponent implements OnInit {
	fireWallExpanded = true;

	constructor(private _customEvents: CustomEvents) { }

	hasACL = true;

	ngOnInit() {
		this.hasACL = AppConfigs.currentUser.hasACL;
	}

	toggleFireWall() {
		// this.fireWallExpanded = !this.fireWallExpanded;
		this.fireWallExpanded = this.fireWallExpanded;
	}

	createAcl() {
		this._customEvents.showDoubleOverLay.emit( {show: true} );
		this._customEvents.createAclEvt.emit( {show: true} );
	}

}
