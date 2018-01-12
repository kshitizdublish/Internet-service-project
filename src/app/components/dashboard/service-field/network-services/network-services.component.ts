import { Component, OnInit, ViewEncapsulation, Input, ViewChild, OnDestroy } from '@angular/core';
import { NetworkData } from '../../../../vo/service-fileds/network';
import { AppConfigs } from '../../../../common/app.config';
import { Subscription } from 'rxjs/Subscription';
import { CustomEvents } from '../../../../events/customevents';

declare var jQuery: any;

@Component({
	selector: 'app-network-services',
	templateUrl: './network-services.component.html',
	styleUrls: ['./network-services.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NetworkServicesComponent implements OnInit, OnDestroy {

	// TODO Search Site element
	// @ViewChild('searchSite') searchSite;

	filterargs = {siteName: ''};
	sitesNames: Array<any> = [{ id: 0, siteName: '', selected: '' }];
	private getAllSitesNameSub: Subscription;
	private showClientListEvtSub: Subscription;

	@Input() networkObj: NetworkData = new NetworkData();

	activeBtn = 1;
	ipvpnExpanded = true;
	internetExpanded = false;
	wifiExpanded = false;
	qosExpanded = false;
	ipvpnSitesExpanded = false;
	showConfigPanel = false;
	multiple = false;

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		// populate the site names in the qOS site table for CRUD Operations
		this.getAllSitesNameSub = this._customEvents.getAllSitesNameEvt.subscribe((value: any) => {
			this.getSitesName(AppConfigs.siteLocations);
		});

		// clear the filterargs on closing of site-info panel
		// this.showClientListEvtSub = this._customEvents.showClientListEvt.subscribe( (value: any) => {
		// 	if (value.show === false) {
		// 		this.filterargs = {siteName: ''};
		// 		this.searchSite.nativeElement.value = '';
		// 	}
		// });
	}

	getSitesName(data) {
		this.sitesNames = [];
		for (let i = 0; i < data.length; i++) {
			const addObj = { id: data[i].id, siteName: data[i].name, selected: '', location: data[i].location };
			this.sitesNames.push(addObj);
		}
	}

	toggleIPVPNSites() {
		this.ipvpnSitesExpanded = !this.ipvpnSitesExpanded;
	}
	toggleConfigPanel(configPanel) {
		if (configPanel === 'ipvpnConfig') {
			console.log('Network Service * IPVPN * Configure Btn Clicked');
			this._customEvents.configVPN.emit({ show: true });
		}
	}

	showInbound() {
		console.log('Network Service * Internet * Inbound Btn Clicked');
	}

	showOutbound() {
		console.log('Network Service * Internet * Outbound Btn Clicked');
	}

	showRules() {
		console.log('Network Service * Internet * Rule Btn Clicked');
	}

	setQosParam(siteData) {
		this._customEvents.setQoSParamEvt.emit({show: true, siteData: siteData});
	}

	// TODO with QOS Search
	// searchSiteName(value: any) {
	// 	this.filterargs = {siteName: value};
	// }

	ngOnDestroy() {
		if (this.getAllSitesNameSub) {
			this.getAllSitesNameSub.unsubscribe();
		}
		if (this.showClientListEvtSub) {
			this.showClientListEvtSub.unsubscribe();
		}
	}
	editIPVPN(eve) {
		console.log('Network Service * IPVPN * edit Btn Clicked');
	}
}
