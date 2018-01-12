import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { CustomEvents } from '../../../events/customevents';
import { AppConfigs } from '../../../common/app.config';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../vo/users/User';
import { NetworkService } from '../../../services/site-info-services/network.services';
import { NetworkData } from '../../../vo/service-fileds/network';
import { ConnectivityService } from '../../../services/site-info-services/connectivity.services';
import { ConnectivityData } from '../../../vo/service-fileds/connectivity';
import { TranslateService, TranslateDirective } from 'ng2-translate';

@Component({
	selector: 'app-site-info-panel',
	templateUrl: './site-info-panel.component.html',
	styleUrls: ['./site-info-panel.component.scss']
})
export class SiteInfoPanelComponent implements OnInit, OnDestroy {

	currentUser: User;

	selectedLocation = '';
	_selectedLocationId = '';
	selectedCSRType = '';
	selectedSiteId = '';

	showNetworkServices = false;
	showSecurityServices = false;
	showConnectivityServices = false;
	networkObject: NetworkData = new NetworkData();
	connectivityObject: ConnectivityData = new ConnectivityData();
	selectedSiteObj: any;
	isClickedMarker: boolean;

	get SelectedLocationId(): any {
		return this._selectedLocationId;
	}

	@Input() set SelectedLocationId(value: any) {
		this._selectedLocationId = value;

		const index = AppConfigs.siteLocations.findIndex(x => x.id === value);
		this.selectedSiteObj = AppConfigs.siteLocations[index];

		// make the default tab active
		this.showNetwork();
		this.tabSelectCount = 1;
		// call an API to get IPVPN data on location marker click
		this.networkObject = new NetworkData();
		if (this._selectedLocationId) {
			// for site basic details
			this.connectivityObject.siteBasic.name = this.selectedSiteObj.name;
			this.connectivityObject.siteBasic.location = this.selectedSiteObj.location;
			this.connectivityObject.siteBasic.description = this.selectedSiteObj.description;
			this.connectivityObject.siteBasic.wanAccessType = this.selectedSiteObj.wanAccessType;
			this.connectivityObject.siteBasic.localCpeType = this.selectedSiteObj.localCpeType;
			this.connectivityObject.siteBasic.areaName = this.selectedSiteObj.areaName;
			this.connectivityObject.siteBasic.totalUpstreamBandwidth = this.selectedSiteObj.totalUpstreamBandwidth;
			this.connectivityObject.siteBasic.totalDownstreamBandwidth = this.selectedSiteObj.totalDownstreamBandwidth;
			this.connectivityObject.siteBasic.vpnUpstreamBandwidth = this.selectedSiteObj.vpnUpstreamBandwidth;
			this.connectivityObject.siteBasic.vpnDownstreamBandwidth = this.selectedSiteObj.vpnDownstreamBandwidth;
			this.connectivityObject.siteBasic.upstreamQosProfile = this.selectedSiteObj.upstreamQosProfile;
			this.connectivityObject.siteBasic.downstreamQosProfile = this.selectedSiteObj.downstreamQosProfile;
			this.connectivityObject.siteBasic.description = ''; // this.selectedSiteObj.description; TODO: need to enable later

			this._networkService.getIpvpnData().subscribe((resp: any) => {
				if ( (resp.objects as Array<any>).length > 0 ) {
					if (resp.objects[0]) {
						this.networkObject.ipvpn.topology = resp.objects[0].topology;
						this.networkObject.ipvpn.layer = resp.objects[0].layer;
						this.networkObject.ipvpn.name = resp.objects[0].name;
					}
				}
			}, (error) => { this.errorHandler(error.status, this._customEvents, 'getIpvpnData'); });

			this._networkService.getGatewayData().subscribe((resp: any) => {
				if ( (resp.data as Array<any>).length > 0 ) {
					if (resp.data[0]) {
						this.networkObject.internetAccess.name = resp.data[0].name;
						this.networkObject.internetAccess.publicIp = resp.data[0].publicIp;
						this.networkObject.internetAccess.protectionType = resp.data[0].deployPosition;
						this.networkObject.internetAccess.protectGourpId = resp.data[0].protectGourpId;
						this.networkObject.internetAccess.sourceCidrBlocks = resp.data[0].sourceCidrBlocks;
						this.networkObject.internetAccess.providerExtension = resp.data[0].providerExtension;
						this.networkObject.internetAccess.description = resp.data[0].description;
					}
				}
			}, (error) => { this.errorHandler(error.status, this._customEvents, 'getGatewayData'); });

			/* TODO later may be it required
			this._networkService.getQoSData().subscribe((resp: any) => {
				this.networkObject.qOS.inBound.profileName = resp[0].name;
				this.networkObject.qOS.inBound.direction = resp[0].direction;
				this.networkObject.qOS.inBound.description = resp[0].description;
			}, (error) => { this.errorHandler(error.status, this._customEvents, 'getQoSData'); });
			*/

			this._networkService.getPublicIPData().subscribe((resp: any) => {
				if ( (resp.data as Array<any>).length > 0 ) {
					if (resp.data[0]) {
						this.networkObject.publicIp.quantity = resp.data[0].quantity;
						this.networkObject.publicIp.iPVersion = resp.data[0].ipVersion;
						this.networkObject.publicIp.cidr = resp.data[0].cidr;
						this.networkObject.publicIp.gatewayIP = resp.data[0].gatewayIP;
					}
				}
			}, (error) => { this.errorHandler(error.status, this._customEvents, 'getPublicIPData'); });

			// TODO: need it for future
			/* this._networkService.getRAccessData().subscribe((resp: any) => {
				if (resp.data[0]) {
					// this.networkObject = new ConnectivityData();
					this.networkObject.remoteAccess.connUsers = resp.totalNum;
					this.networkObject.remoteAccess.name = resp.data[0].name;
					this.networkObject.remoteAccess.domainName = resp.data[0].domainName;
					this.networkObject.remoteAccess.maxUsers = resp.data[0].basic.maxUsers;
					this.networkObject.remoteAccess.maxOnlineUsers = resp.data[0].basic.maxOnlineUsers;
					this.networkObject.remoteAccess.status = resp.data[0].serviceState;
				}
			}, (error) => { this.errorHandler(error.status, this._customEvents, 'getRAccessData'); });
			*/

			this._networkService.getRemoteAccessData().subscribe((resp: any) => {
				if ( (resp.data as Array<any>).length > 0 ) {
					if (resp.data[0]) {
						this.networkObject.remoteAccess.name = resp.data[0].name;
						this.networkObject.remoteAccess.ipAddress = resp.data[0].ipAddress;
						this.networkObject.remoteAccess.maxOnlineUsers = resp.data[0].basic.maxOnlineUsers;
						this.networkObject.remoteAccess.maxUsers = resp.data[0].basic.maxOnlineUsers;
						this.networkObject.remoteAccess.description = resp.data[0].description;
					}
				}
			}, (error) => { this.errorHandler( error.status, this._customEvents, 'getPublicIPData'); });


		}
		for (let i = 0; i < this.sitesNames.length; i++) {
			if (this.sitesNames[i].id === value) {
				this.sitesNames[i].selected = 'select';
				this.selectedLocation = this.sitesNames[i].location;
				this.selectedCSRType = 'AR161W'; // TODO: need to replace once parameter avail in api
				this.selectedSiteId = value;
			} else {
				this.sitesNames[i].selected = '';
				this.selectedCSRType = '';
			}
		}
	}

	sitesNames: Array<any> = [{ id: 0, name: '', selected: '' }];
	createSiteClicked: boolean;

	private getAllSitesNameSub: Subscription;
	private showNetworkServicesSub: Subscription;

	tabSelectCount = 1;

	constructor(
		private _customEvents: CustomEvents,
		private _networkService: NetworkService,
		private _connectivityService: ConnectivityService,
		private translate: TranslateService
	) { }

	ngOnInit() {
		// populate the site names in the float-site-info comp dropdown
		this.getAllSitesNameSub = this._customEvents.getAllSitesNameEvt.subscribe((value: any) => {
			this.getSitesName(AppConfigs.siteLocations);
		});

		// TODO need to change logic once Auth Validation is completed from Middleware
		this.currentUser = (AppConfigs.currentUser) ? AppConfigs.currentUser : new User();

		this.showNetworkServicesSub = this._customEvents.showNetworkServicesEvt.subscribe((value: any) => {
			this.showNetworkServices = true;
		});

		// this._customEvents.showSiteBandwidthEvt.emit({ show: true });
	}

	getSitesName(data) {
		this.sitesNames = [];
		for (let i = 0; i < data.length; i++) {
			const addObj = { id: data[i].id, name: data[i].name, selected: '', location: data[i].location };
			this.sitesNames.push(addObj);
		}
	}

	// create site or edit site click function based on 'editSite' value false/true resp.
	showSiteForm(editSite) {
		this._customEvents.createNewSiteEvt.emit({ show: true, editSite: editSite, obj: this.selectedSiteObj });
	}

	onChangeSiteLocation(id: any) {
		this._customEvents.selectMarkerEvt.emit({ id: id });
		this._customEvents.showSiteBandwidthEvt.emit({ id: id });
	}

	// Network service tab clicked
	showNetwork() {
		this.showNetworkServices = true;
		this.showSecurityServices = false;
		this.showConnectivityServices = false;

	}
	// Security service tab clicked
	showSecurity() {
		this.showNetworkServices = false;
		this.showSecurityServices = true;
		this.showConnectivityServices = false;
	}
	// Connectivity service tab clicked
	showConnectivity() {
		this.showNetworkServices = false;
		this.showSecurityServices = false;
		this.showConnectivityServices = true;
		// call an API to get the data

		this._connectivityService.getVirtualRoutersData().subscribe((resp: any) => {
			const obj: any = resp.objects[0];
			if (obj) {
				this.connectivityObject.virtualRouters.name = resp.objects[0].name;
				this.connectivityObject.virtualRouters.description = '';
				this.connectivityObject.virtualRouters.gwId = resp.objects[0].gwId;
				// this.connectivityObject.virtualRouters.siteId = String( obj.site-id );
			}
		}, (error) => { this.errorHandler(error.status, this._customEvents, 'getVirtualRoutersData'); });

		this._connectivityService.getCPEData().subscribe((resp: any) => {
			const obj: any = resp.data[0];
			if (obj) {
				this.connectivityObject.cpe.name = resp.data[0].name;
				this.connectivityObject.cpe.description = '';
				this.connectivityObject.cpe.esn = resp.data[0].esn;
				// this.connectivityObject.cpe.siteId = String( obj.site-id );
				this.connectivityObject.cpe.runningStatus = resp.data[0].esn;
			}
		}, (error) => { this.errorHandler(error.status, this._customEvents, 'getCPEData'); });

		this._connectivityService.getVLANData().subscribe((resp: any) => {
			const obj: any = resp.data[0];
			if (obj) {
				this.connectivityObject.vlan.name = resp.data[0].name;
				this.connectivityObject.vlan.description = '';
				this.connectivityObject.vlan.vlan = resp.data[0].vlan;
				// this.connectivityObject.vlan.siteId = String( obj.site-id );
				this.connectivityObject.vlan.trunkVlan = resp.data[0].trunkVlan;
				this.connectivityObject.vlan.name = resp.data[0].name;
				this.connectivityObject.vlan.ports = resp.data[0].ports;
				this.connectivityObject.vlan.portsNames = resp.data[0].portsNames;
			}
		}, (error) => { this.errorHandler(error.status, this._customEvents, 'getVLANData'); });

		this._connectivityService.getSubnetData().subscribe((resp: any) => {
			const obj: any = resp.data[0];
			if (obj) {
				this.connectivityObject.subnet.name = resp.data[0].name;
				this.connectivityObject.subnet.description = '';
				this.connectivityObject.subnet.vlanId = resp.data[0].vlanId;
				// this.connectivityObject.subnet.siteId = String( obj.site-id );
				this.connectivityObject.subnet.virtualRouteId = resp.data[0].virtualRouteId;
				this.connectivityObject.subnet.ip_version = resp.data[0].ip_version;
				this.connectivityObject.subnet.pageSize = resp.data[0].pageSize;
				this.connectivityObject.subnet.pageNum = resp.data[0].pageNum;
			}
		}, (error) => { this.errorHandler(error.status, this._customEvents, 'getSubnetData'); });
	}

	showRemoveSiteForm() {
		this._customEvents.removeSiteEvt.emit({ show: true });
	}

	closeSiteInfoPanel() {
		this._customEvents.hideDashboardActiveMenuEvt.emit({});
	}

	ngOnDestroy() {
		if (this.getAllSitesNameSub) {
			this.getAllSitesNameSub.unsubscribe();
		}
		if (this.showNetworkServicesSub) {
			this.showNetworkServicesSub.unsubscribe();
		}
	}

	errorHandler(status: string, customEvents: CustomEvents, method: string) {
		AppConfigs.errorCodeHandler(status, this.translate, customEvents, method);
	}

}
