import { EventEmitter } from '@angular/core';

export class CustomEvents {

	/**
	* show hide global spinning loader
	* which will cover whole screen
	**/
	public showHideLoader: EventEmitter<any> = new EventEmitter();

	/**
	* show hide global spinning loader
	* which will cover whole screen
	**/
	public authValidateComplete: EventEmitter<any> = new EventEmitter();

	/**
	* handle unauthorized user error
	* or while click logout
	**/
	public unAuthorizedError: EventEmitter<any> = new EventEmitter();

	/**
	* navigate to Dashboard page after successfull login
	* or after valid session for localstorage
	**/
	public routToDashBoard: EventEmitter<any> = new EventEmitter();

	/**
	* navigate to Feedback page
	**/
	public routToFeedback: EventEmitter<any> = new EventEmitter();

	/**
	* navigate to Contacts page
	**/
	public routToContacts: EventEmitter<any> = new EventEmitter();
	/**
	* Language Change Event
    * example: 'this._customEvents.langChangeEvt.emit( {lang: 'fr'} );'
	**/
	public langChangeEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show Create a new site Form Panel
	* example: 'this._customEvents.createNewSiteEvt.emit( {show: true} );'
	**/
	public createNewSiteEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show Create a new site Form Panel
	* example: 'this._customEvents.createAclEvt.emit( {show: true} );'
	**/
	public createAclEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show Create a new remoteAccessForm Panel
	* example: 'this._customEvents.createRemoteAccessEvt.emit( {show: true} );'
	**/
	public createRemoteAccessEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show | Hide : true | false, client list pop menu
	* example: 'this._customEvents.showClientListEvt.emit({show: true });'
	**/
	public showClientListEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show Create a new site Form Panel
	* example: 'this._customEvents.createNewVpnEvt.emit( {show: true} );'
	**/
	public createNewVpnEvt: EventEmitter<any> = new EventEmitter();


    /**
	*Show: true, site bandwidth info pop menu
	*example: 'this._customEvents.showSiteBandwidthEvt.emit({show: true });'
	**/
	public showSiteBandwidthEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * fetching all Sites locations
	 * while on create new site success
	 */
	public getSiteLocationsEvt: EventEmitter<any> = new EventEmitter();

	/**
	* close current active dashboard panels
	**/
	public hideDashboardActiveMenuEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * fetching all sites name
	 * map in the float info comp drop down
	 */
	public getAllSitesNameEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * triggers config vpn popup
	 */
	public configVPN: EventEmitter<any> = new EventEmitter();

	/**
	 * show marker selected
	 * while selecting marker from dropdown from info panel
	 */
	public selectMarkerEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * show alert modal
	 * while selecting any client from left client list
	 * example: 'this._customEvents.showAlertModalEvt.emit( {show: true, heading: '', bodyText: ''} );'
	 */
	public showAlertModalEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * show confirm modal
	 * while selecting any client from left client list
	 * example: 'this._customEvents.showConfirmModalEvt.emit( {show: true, data: dataObj} );'
	 */
	public showConfirmModalEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * show network services panel
	 * while selecting/clicking any site icon
	 * example: 'this._customEvents.showNetworkServicesEvt.emit( {show: true} );'
	 */
	public showNetworkServicesEvt: EventEmitter<any> = new EventEmitter();

	/**
	 * show add customer panel
	 * while selecting/clicking add icon
	 * example: 'this._customEvents.showAddCustomerEvt.emit( {show: true} );'
	 */
	public showAddCustomerEvt: EventEmitter<any> = new EventEmitter();
    /**
	 * show Set QOS Parameters panel
	 * while clicking any edit QOS icon
	 * example: 'this._customEvents.setQoSParamEvt.emit( {show: true, siteData: dataObj} );'
	 */
	public setQoSParamEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show | Hide : true | false, remove site form
	* example: 'this._customEvents.removeSiteEvt.emit({show: true });'
	**/
	public removeSiteEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show | Hide : true | false, app left panel
	* example: 'this._customEvents.showLeftPanelEvt.emit({show: true });'
	**/
	public showLeftPanelEvt: EventEmitter<any> = new EventEmitter();

	/**
    * Show | Hide | Toggle
	* Notification box when click on notification icon
	* example: 'this._customEvents.toggleNotificationEvt.emit({show: true });'
    **/
	public toggleNotificationEvt: EventEmitter<any> =  new EventEmitter();

	/**
	 * Show | Hide Profile Options
	 * when hover on profile picture
	 * example: 'this._customEvents.showProfileMenuEvt.emit( {show: true} );'
	 */
	public showProfileMenuEvt: EventEmitter<any> = new EventEmitter();

	/**
	* show hide gray overly
	* while click on service panel btn
	**/
	public showHideOverlayMap: EventEmitter<any> = new EventEmitter();

	/**
	* show hide service panel
	**/
	public showHideServicePanel: EventEmitter<any> = new EventEmitter();

	/**
	*example: 'this._customEvents.sendsiteBandwidthJSONEvt.emit({ JSON });'
	**/
	public sendsiteBandwidthJSONEvt: EventEmitter<any> = new EventEmitter();

	/* Show | Hide | Toggle Create Internet Access form
	 * Open : click on create internet access action icon
	 * Close : click on map, close icon
	 */
	public toggleCreateInternetFormEvt: EventEmitter<any> = new EventEmitter();

	/*
	 * show the sites specific to the selected location
	 *
	 */
	public showSitesEvt: EventEmitter<any> = new EventEmitter();
	/**
	* filter site locaion on map
	**/
	public filterSiteOnStatusEvt: EventEmitter<any> = new EventEmitter();

	/**
	* Show | Hide : true | false, create Wi-Fi form
	* example: 'this._customEvents.createWiFiEvt.emit({show: true });'
	**/
	public createWiFiEvt: EventEmitter<any> = new EventEmitter();

	/**
	* show overlay on top of site-info panel
	* example: 'this._customEvents.showDoubleOverLay.emit({show: true });'
	**/
	public showDoubleOverLay: EventEmitter<any> = new EventEmitter();

	constructor() { }
}
