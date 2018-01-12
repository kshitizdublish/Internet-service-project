import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ConnectivityData } from '../../../../vo/service-fileds/connectivity';
import { CustomEvents } from '../../../../events/customevents';
import { AppConfigs } from '../../../../common/app.config';

@Component({
	selector: 'app-connectivity-services',
	templateUrl: './connectivity-services.component.html',
	styleUrls: ['./connectivity-services.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ConnectivityServicesComponent implements OnInit {
	@Input() connectivityObj: ConnectivityData = new ConnectivityData();
	@Input() selectedSiteObj;
	offNetExpanded = true;
	remoteExpanded = false;

	hasWifi = true;

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		this.hasWifi = AppConfigs.currentUser.hasACL;
	}

	toggleOffnet() {
		this.offNetExpanded = !this.offNetExpanded;
	}

	toggleRemote() {
		this.remoteExpanded = !this.remoteExpanded;
	}

	// show the create Wi-Fi form
	createWiFi() {
		this._customEvents.showDoubleOverLay.emit( {show: true} );
		this._customEvents.createWiFiEvt.emit( {show: true} );
	}
}
