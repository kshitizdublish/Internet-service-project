import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CustomEvents } from '../../../events/customevents';
import { GetAllSitesService } from '../../../services/getAllSites/getAllSites.service';
import { SiteLocation } from '../../../vo/locations/sites-location';
import { SiteInfo } from '../../../vo/sites-info/site-info';
import { AppConfigs } from '../../../common/app.config';
import { Subscribable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';

declare var google: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	@Input() showLocationSearch: Boolean = true;
	@ViewChild('agm') agm;
	private createNewSiteSub: Subscription;
	private configVPNSub: Subscription;
	private getSiteLocationsSub: Subscription;
	private hideDashboardActiveMenuSub: Subscription;
	private showConfigPanel: Subscription;
	private selectMarkerSub: Subscription;
	private addCustomerSub: Subscription;
	private setQoSParamSub: Subscription;
	private showRemoveSiteSub: Subscription;
	private showProfileMenuSub: Subscription;
	private toggleCreateInternetFormSub: Subscription;
	private createNewVpnSub: Subscription;


	private showHideOverlayMapSub: Subscription;
	private createRemoteAccessSub: Subscription;
	private showSitesSub: Subscription;
	private filterSiteOnStatusSub: Subscription;
	private createWiFiSub: Subscription;
	private createAclSub: Subscription;
	private showDoubleOverLaySub: Subscription;

	// showClientListPanel: boolean;
	alertHeading = '';
	alertBodyText = '';

	// Default Lat Lng for Netherlands
	lat = 52.132633;
	lng = 5.2912659999999505;

	zoomControlOptions: any;
	bounds: any;

	// true | false will show/hide Site Location Information
	isClickedMarker: boolean;
	showCreateSiteForm = false;
	showCreateAclForm = false;
	showCreateVpnForm = false;
	showClientList = false;   // TODO need to remove the 'app-client-list' comp
	showErrorModal = false;
	showCustomerPanel = false;
	showAlertModal = false;
	setQoSParam = false;
	showRemoveSiteForm = false;
	isShowInternetAccessForm = false;
	showInternetForm = false;
	showVpnForm = false;
	siteData: {};
	showRemoteAccessForm = false;
	showWifiForm = false;

	showProfileMenu = false;

	showOverlay = false;
	overlayWhileDouble = false; // overlay will be visible on top of Site info

	siteInfo: SiteInfo = new SiteInfo();
	// marker ID will be passed to Info Panel
	selectedMarkerId: any;

	// turn off customer panel
	isCustomerSelected = false;

	ddosDeployment: Array<any> = [];
	aclFormElements: any = {};

	updateInterval: any;
	updateIntervalTime = 15000 * 2;
	isTimerOn = false;

	// temp, kept for mapping only
	defaultCordins: Array<any> = [
		{
			latitude: 52.36553758871975,
			longitude: 4.9053955078125,
		},
		{
			latitude: 51.91039070988962,
			longitude: 4.50164794921875,
		},
		{
			latitude: 51.43346414054374,
			longitude: 5.4876708984375,
		},
		{
			latitude: 51.984880139916626,
			longitude: 5.9051513671875,
		}
	];

	pointersCopy: Array<any> = [];
	pointers: Array<any> = [];
	cordins: Array<any> = [];
	// check if google map is loaded on DOM
	isMapReady: boolean;

	stylez: Array<any> = [];

	toogleWhiteMapView(value: boolean) {
		if (value === true) {
			this.stylez = AppConfigs.whiteMap;
		} else {
			this.stylez = [];
		}
	}

	makeIconsAndBound() {
		this.isMapReady = true;
		try {
			this.bounds = new google.maps.LatLngBounds();
			for (let i = 0; i < this.cordins.length; i++) {
				const loc = new google.maps.LatLng(this.cordins[i].latitude, this.cordins[i].longitude);
				const iconObj = this.getIconObj(String(this.cordins[i].iconType));
				this.cordins[i].Icon = iconObj;
				this.bounds.extend(loc);
			}
			if (this.cordins.length === 0) {
				const defaultCordins = [{ latitude: 50.841720, longitude: 4.378052 }, { latitude: 53.732974, longitude: 7.165833 }];
				defaultCordins.forEach((item) => {
					const loc = new google.maps.LatLng(item.latitude, item.longitude);
					this.bounds.extend(loc);
				});
			}

		} catch (e) {
			// got error for slow net, it will be called once again google map is loaded in DOM
			console.log('HOME * makeIconsAndBound: ' + e);
		}

		this.zoomControlOptions = {
			style: google.maps.ControlPosition.small,
			position: google.maps.ControlPosition.BOTTOM_RIGHT
		};

		const streetViewControlOptions: any = {
			position: google.maps.ControlPosition.RIGHT_CENTER
		};

	}

	constructor(
		private _customEvents: CustomEvents,
		private _getAllSitesService: GetAllSitesService,
		private translate: TranslateService) { }

	ngOnInit() {
		AppConfigs.selectedTabOnNavs = 0; // set customer nav selected
		/*if (AppConfigs.selectedClientIndex !== -1) {
			this.isCustomerSelected = true;
			// get All sites Data
			this.getAllSitesData();
		}*/
		this.createNewSiteSub = this._customEvents.createNewSiteEvt.subscribe((value: any) => {
			this.showCreateSiteForm = value.show;
		});
		this.createAclSub = this._customEvents.createAclEvt.subscribe((value: any) => {
			this.showCreateAclForm = value.show;
		});
		this.createRemoteAccessSub = this._customEvents.createRemoteAccessEvt.subscribe((value: any) => {
			this.showRemoteAccessForm = value.show;
		});
		this.createNewVpnSub = this._customEvents.createNewVpnEvt.subscribe((value: any) => {
			this.showCreateVpnForm = value.show;
		});

		this.configVPNSub = this._customEvents.configVPN.subscribe((value: any) => {
			this.showConfigPanel = value.show;
		});
		this.getSiteLocationsSub = this._customEvents.getSiteLocationsEvt.subscribe((value: any) => {
			// close site info while create new location success
			this.isClickedMarker = false;
			this.showCreateSiteForm = false;
			this.showRemoveSiteForm = false;
			this.showRemoteAccessForm = false;
			this.showWifiForm = false;
			this.isCustomerSelected = true;

			// get All sites Data
			this.getAllSitesData();
			this.getAclFormElements();
		});

		this.hideDashboardActiveMenuSub = this._customEvents.hideDashboardActiveMenuEvt.subscribe((value: any) => {
			this.closeAllPanels();
		});

		this.selectMarkerSub = this._customEvents.selectMarkerEvt.subscribe((value: any) => {
			this.selectedMarkerId = value.id;
			this.showSelectedMarker({ id: value.id });
		});

		this.setQoSParamSub = this._customEvents.setQoSParamEvt.subscribe((value: any) => {
			this.setQoSParam = value.show;
			this.siteData = value.siteData;
		});

		// show/hide the remove site form based on show value
		this.showRemoveSiteSub = this._customEvents.removeSiteEvt.subscribe((value: any) => {
			this.showRemoveSiteForm = value.show;
		});

		// show/hide the profile menu options based on show value
		this.showProfileMenuSub = this._customEvents.showProfileMenuEvt.subscribe((value: any) => {
			this.showProfileMenu = value.show;
		});

		// show overlay visible
		this.showHideOverlayMapSub = this._customEvents.showHideOverlayMap.subscribe((value: any) => {
			this.showOverlay = value.show;
		});

		// Show/Hide internet access form
		this.toggleCreateInternetFormSub = this._customEvents.toggleCreateInternetFormEvt.subscribe((value: any) => {
			// populate the form elements
			this.getInternetFormElements();
			this.isShowInternetAccessForm = value.show;
		});

		// show sites related to the selected location from search field
		this.showSitesSub = this._customEvents.showSitesEvt.subscribe((value: any) => {
			this.onMarkerClick(value.locationData);
		});

		// Filter the site on staus
		this.filterSiteOnStatusSub = this._customEvents.filterSiteOnStatusEvt.subscribe((siteStatus: string) => {
			this.filterSiteLocationOnStatus(siteStatus);
		});
		// Show/Hide create wifi form
		this.createWiFiSub = this._customEvents.createWiFiEvt.subscribe((value: any) => {
			this.showWifiForm = value.show;
		});

		this.showDoubleOverLaySub = this._customEvents.showDoubleOverLay.subscribe( (value: any) => {
			this.overlayWhileDouble = value.show;
		});
	}

	/**
	 * call for update for every 5 secs
	 */
	updateDataEvery5sec() {
		this.isTimerOn = true;
		this.updateInterval = setInterval( () => { this.getAllSitesData(); }, this.updateIntervalTime);
	}

	getInternetFormElements() {
		const indexDdos = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'ddosDeployment');
		this.ddosDeployment = [];
		this.ddosDeployment = AppConfigs.dynamicFormElements[indexDdos].options;
	}

	/**
	 * getting and making form elements ready for ACL rules from
	 */
	getAclFormElements() {
    const indexAction = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'action');
    const actionOption = AppConfigs.dynamicFormElements[indexAction].options;

		this.aclFormElements.actionOption = actionOption;
	}

	ngOnDestroy() {
		if (this.createNewSiteSub) {
			this.createNewSiteSub.unsubscribe();
		}
		if (this.getSiteLocationsSub) {
			this.getSiteLocationsSub.unsubscribe();
		}
		if (this.hideDashboardActiveMenuSub) {
			this.hideDashboardActiveMenuSub.unsubscribe();
		}
		if (this.setQoSParamSub) {
			this.setQoSParamSub.unsubscribe();
		}
		if (this.configVPNSub) {
			this.configVPNSub.unsubscribe();
		}
		if (this.showRemoveSiteSub) {
			this.showRemoveSiteSub.unsubscribe();
		}
		if (this.showProfileMenuSub) {
			this.showProfileMenuSub.unsubscribe();
		}
		if (this.toggleCreateInternetFormSub) {
			this.toggleCreateInternetFormSub.unsubscribe();
		}
		if (this.createRemoteAccessSub) {
			this.createRemoteAccessSub.unsubscribe();
		}
		if (this.showSitesSub) {
			this.showSitesSub.unsubscribe();
		}
		if (this.filterSiteOnStatusSub) {
			this.filterSiteOnStatusSub.unsubscribe();
		}
		if (this.createWiFiSub) {
			this.createWiFiSub.unsubscribe();
		}
		if (this.showDoubleOverLaySub) {
			this.showDoubleOverLaySub.unsubscribe();
		}

		clearInterval(this.updateInterval);
	}

	onMarkerOver(markerObj: any, onHover: boolean) {
		this.showSelectedMarker(markerObj, onHover = true);
	}

	onMarkerClick(markerObj: any) {
		this.isClickedMarker = true;
		this.selectedMarkerId = markerObj.id;
		this._customEvents.showSiteBandwidthEvt.emit({ id: markerObj });
		this._customEvents.showNetworkServicesEvt.emit({ show: true });

		this.showSelectedMarker(markerObj);
	}

	showSelectedMarker(markerObj: any, onHover = false) {
		for (let i = 0; i < this.cordins.length; i++) {
			let iconObj;
			let iconType = String(this.cordins[i].iconType);

			if (this.cordins[i].id === markerObj.id) {
				if (iconType === 'green' && onHover === false ) {
					iconType = 'green-selected';
				}
				this.cordins[i].isOpen = true;
			} else {
				this.cordins[i].isOpen = false;
			}
			iconObj = this.getIconObj(iconType);
			this.cordins[i].Icon = iconObj;

		}
	}

	getIconObj(iconType: string) {
		const iconObj = {
			url: String('./assets/icons/' + iconType + '.png'),
			scaledSize: new google.maps.Size(35, 35),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(15, 15)
		};
		return iconObj;
	}

	onMapClicked() {
		// closing all maker opened while click on map
		for (let i = 0; i < this.cordins.length; i++) {
			this.cordins[i].isOpen = false;
		}

		this.showSelectedMarker({ id: '' });
		this.closeAllPanels();
	}

	closeAllPanels() {
		this.isClickedMarker = false;
		this.showCreateSiteForm = false;
		this.showCreateVpnForm = false;
		this.showClientList = false;
		this.showRemoveSiteForm = false;
		this.showRemoteAccessForm = false;
		this._customEvents.configVPN.emit({ show: false });
		this._customEvents.showClientListEvt.emit({ show: false });
		this._customEvents.showAddCustomerEvt.emit({ show: false });
		this._customEvents.setQoSParamEvt.emit({ show: false, siteData: {} });
		this._customEvents.showProfileMenuEvt.emit({ show: false });
		this._customEvents.toggleNotificationEvt.emit({ show: false });
		this._customEvents.toggleCreateInternetFormEvt.emit({ show: false });
		this._customEvents.createRemoteAccessEvt.emit({ show: false });
		this._customEvents.createWiFiEvt.emit( {show: false} );
	}

	showLatLngError() {
		// empty pointers as there is no locations
		this.pointers = [];
		this.cordins = [];
		AppConfigs.siteLocations = [];

		// pass the value to an alert modal
		this.translate.get('ErrorLocationModal.errorHeader').subscribe((res: string) => {
			this.alertHeading = res;
		});
		this.translate.get('ErrorLocationModal.bodyText').subscribe((res: string) => {
			this.alertBodyText = res;
		});

		// show an alert modal and pass the values
		this._customEvents.showAlertModalEvt.emit({
			show: true,
			heading: this.alertHeading,
			bodyText: this.alertBodyText
		});
	}

	getStatusCode( type: string) {
		const _type = (String(type).toLowerCase() === 'online') ? '#00a722' : '#676767';
		return _type;
	}

	getAllTopologyData( data: any) {
		this.pointersCopy = [];
		try {
			const allSitesData = data.topologyStructure;
			for (let i = 0; i < allSitesData.length; i++) {
				const latLng = allSitesData[i].latlong;
				const arr: Array<any> = [{latitude: parseFloat(latLng[0].latitude), longitude: parseFloat(latLng[0].longitude)},
																{latitude: parseFloat(latLng[1].latitude), longitude: parseFloat(latLng[1].longitude)}];
				const addObj = {
					color: this.getStatusCode( allSitesData[i].runningStatus ),
					latlong: arr
				};
				this.pointersCopy.push(addObj);
				this.pointers.push(addObj);
			}
		} catch (e) {
			console.warn('HOME * getAllTopologyData - Topology Error' + e);
		}
	}

	// get the dashboard statistics
	getAllSitesData() {
		this._customEvents.showHideLoader.emit({ show: true });
		this._getAllSitesService.requestAllSites().subscribe((response: any) => {

			this._customEvents.showHideLoader.emit({ show: false });
			this.cordins = [];
			AppConfigs.siteLocations = [];
			// removing white space before and after of JSON value
			const cleanJSON = JSON.parse(JSON.stringify(response).replace(/"\s+|\s+"/g, '"'));
			const allSitesData: Array<any> = JSON.parse(cleanJSON._body).data as Array<any>;

			if (allSitesData.length <= 0) {
				this.showLatLngError();
			}
			// assign the sites in site-location object using a for loop
			for (let i = 0; i < allSitesData.length; i++) {
				if (!this.checkNullPointer(String(allSitesData[i].location), String(allSitesData[i].name), 'location')) {
					this.bindAndMapLocation(allSitesData[i], String(allSitesData[i].location));
				} else if (!this.checkNullPointer(String(allSitesData[i].description), String(allSitesData[i].name), 'description')) {
					this.bindAndMapLocation(allSitesData[i], String(allSitesData[i].description));
				}
			}
			if (AppConfigs.siteLocations.length <= 0) {
				this.showLatLngError();
			}
			if ( !this.isTimerOn) {
				// start timer if not started
				this.updateDataEvery5sec();
				// populate the site names in the float-site-info comp dropdown
				this._customEvents.getAllSitesNameEvt.emit({});
			}
		}, (error: any) => {
			this._customEvents.showHideLoader.emit({ show: false });
			this.showLatLngError();
			AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'requestAllSites');
			console.warn('HOME * getAllSitesData - Error' + error);
		});
	}

	/**
	 *
	 * @param siteObj
	 * @param latlng
	 * bind each site object
	 * and push to site list
	 */
	bindAndMapLocation(siteObj: any, latlng: string) {
		const siteInfo: SiteLocation = new SiteLocation();
		siteInfo.id = siteObj.id;
		siteInfo.tenantId = siteObj.tenantId;
		siteInfo.name = siteObj.name;
		siteInfo.description = String(siteObj.description).split('~')[0];
		siteInfo.location = String(siteObj.location).split('~')[0];
		siteInfo.wanAccessType = siteObj.wanAccessType;
		siteInfo.localCpeType = siteObj.localCpeType;
		siteInfo.area = siteObj.area;
		siteInfo.areaName = siteObj.areaName;
		siteInfo.totalUpstreamBandwidth = siteObj.totalUpstreamBandwidth;
		siteInfo.totalDownstreamBandwidth = siteObj.totalDownstreamBandwidth;
		siteInfo.vpnUpstreamBandwidth = siteObj.vpnUpstreamBandwidth;
		siteInfo.vpnDownstreamBandwidth = siteObj.vpnDownstreamBandwidth;
		siteInfo.upstreamQosProfile = siteObj.upstreamQosProfile;
		siteInfo.downstreamQosProfile = siteObj.downstreamQosProfile;
		siteInfo.createtime = siteObj.createtime;
		siteInfo.actionState = siteObj.actionState;
		siteInfo.providerExtension = siteObj.providerExtension;
		siteInfo.runningStatus = siteObj.runningStatus;
		// set the coordinates of the site
		const siteCordinate = {
			'name': siteInfo.name,
			'latitude': this.filterLatLng(latlng).lat,    // e.g. 52.36553758871975
			'longitude': this.filterLatLng(latlng).lng,  // e.g. 4.9053955078125
			'iconType': this.getTheStatus(String(siteObj.runningStatus)), // "stat": (this.validateLatLng(latitude)) ? "green" : "gray",
			'Icon': '{url: \'./assets/icons/gray.png\' }',
			'location': siteInfo.location,
			'id': siteInfo.id,
			'isOpen': false,
			'wanAccessType': siteInfo.wanAccessType,
			'area': siteInfo.area,
			'csrType': '',
			'runningStatus': siteInfo.runningStatus
		};
		siteInfo.cordins.push(siteCordinate);
		this.cordins.push(siteCordinate);
		AppConfigs.siteLocations.push(siteInfo);
		if (this.isMapReady) {
			this.makeIconsAndBound();
		}
	}


	filterSiteLocationOnStatus(status: any) {
		this.cordins = [];
		const masterCordins = [];
		AppConfigs.siteLocations.forEach((siteInfo) => {
			siteInfo.cordins.forEach((cordin) => {
				masterCordins.push(cordin);
			});
		});
		if (String(status.siteStatus) === 'allState') {
			this.cordins = masterCordins;
			this.pointersCopy = this.pointers;
		} else {
			this.pointersCopy = [];
			masterCordins.forEach((cord) => {
				if ( String(status.siteStatus).toLowerCase() === String(cord.runningStatus).toLowerCase()) {
					if (String(status.siteStatus).toLowerCase() === 'online') {
						this.pointersCopy = this.pointers;
					}
					this.cordins.push(cord);
				}
			});
		}
		if (this.isMapReady) {
			this.makeIconsAndBound();
		}
	}

	/**
	 *
	 * @param latlng
	 * filter out lat+lng from string
	 * It will check for both ^ and +
	 */
	filterLatLng(latlng) {
		const _latlng = latlng.split('~')[1];
		const latOBJ = { lat: 0, lng: 0 };

		if (_latlng.split('^').length === 2) {
			latOBJ.lat = parseFloat(_latlng.split('^')[0]);
			latOBJ.lng = parseFloat(_latlng.split('^')[1]);
		} else if (_latlng.split('+').length === 2) {
			latOBJ.lat = parseFloat(_latlng.split('+')[0]);
			latOBJ.lng = parseFloat(_latlng.split('+')[1]);
		}

		return latOBJ;
	}

	/**
	 *
	 * @param type
	 * filter current site status
	 */
	getTheStatus(type: string) {
		let status = '';
		switch (type.toLowerCase()) {
			case 'offline':
			case 'disabled':
				status = 'red';
				break;
			case 'online':
				status = 'green';
				break;
			case 'deactive':
				status = 'gray';
				break;
			default:
				status = 'gray';
		}

		return status;

	}

	/**
	 *
	 * @param desc
	 * @param name
	 * validating description param in response object
	 * lat & lng is must in description param
	 * Evey description param must have lat & lng
	 */
	checkNullPointer(desc: string, name: string, type: string): boolean {
		try {
			if (desc == null) {
				console.warn('HOME * checkNullPointer - Description is null, So no location for: ' + name + ' type ' + type);
				return true;
			} else {
				const latlngArr = desc.split('~');
				if (latlngArr.length === 1 || latlngArr.length >= 3) {
					console.warn('HOME * checkNullPointer - As LAT LNG is missing, so no location to display: ' + name + ' type ' + type);
					return true;
				}
			}

		} catch (e) {
			console.warn('HOME * checkNullPointer - Description is null, So no location for: ' + name + ' type ' + type);
			return true;
		}
		return false;
	}

	/**
	 * temporary used for mapping
	 * gray icon and green icons on map
	 */
	validateLatLng(num): boolean {
		let matched = false;
		for (let i = 0; i < this.defaultCordins.length; i++) {
			if (this.defaultCordins[i].latitude === num) {
				matched = true;
				break;
			}
		}
		return matched;
	}

	createSite() {
		this._customEvents.createNewSiteEvt.emit({ show: true });
	}

}
