import { Headers, RequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SiteLocation } from '../vo/locations/sites-location';
import { Customer } from '../vo/customer/Customer';
import { User } from '../vo/users/User';
import { CustomEvents } from '../events/customevents';

export class AppConfigs {

	public static get env(): any {
		return environment;
	}
	public static APP_VERSION = '2.19.2';
	private static _isValidSession = false;
	private static _clientList: Array<Customer> = [];
	private static _selectedClientIndex = -1;
	private static _currentUser: User;
	private static _dynamicFormElements = [];

	private static _selectedTabOnNavs = 0;

	// 400 series ERROR list
	private static BAD_REQUEST 								= 400;
	private static UNAUTHORIZED 							= 401;
	private static FORBIDDEN 								= 403;
	private static NOT_FOUND 								= 404;
	private static METHOD_NOT_ALLOWED 						= 405;
	private static NOT_ACCEPTABLE 							= 406;
	private static PROXY_AUTHENTICATION_REQUIRED 			= 407;
	private static REQUEST_TIMEOUT 							= 408;

	private static EXPECTATION_FAILED 						= 417;
	private static TOO_MANY_REQUESTS 						= 429;
	private static UNAVAILABLE_FOR_LEGAL_REASONS 			= 451;

	// 500 series ERROR list
	private static INTERNAL_SERVER_ERROR 					= 500;
	private static NOT_IMPLEMENTED 							= 501;
	private static BAD_GATEWAY 								= 502;
	private static SERVICE_UNAVAILABLE 						= 503;
	private static GATEWAY_TIMEOUT 							= 504;
	private static HTTP_VERSION                             = 505;
	private static NETWORK_AUTHENTICATION_REQUIRED 		    = 511;

	public static set isValidSession(value: boolean) {
		this._isValidSession = value;
	}
	public static get isValidSession(): boolean { return this._isValidSession; }
	private static sessionKey = 'ziggo_app_session_id';

	private static _siteLocations: Array<SiteLocation> = [];

	// Store SessionId
	public static set sessionId(value: any) {
		localStorage.setItem(this.sessionKey, value);
	}
	public static get sessionId(): any {
		return localStorage.getItem(this.sessionKey);
	}

	/**
	 * clean Auth Means Logout user
	 * hence need to clean all static data as well
	 */
	public static clearAuth(): any {
		localStorage.clear();
		this.isValidSession = false;
		this.siteLocations = [];
		this.selectedClientIndex = 0;
	}

	public static get headerOptions(): any {
		const headers = new Headers( { 'Content-Type': 'application/json' } );
		headers.append(  'X-auth-token', this.sessionId  );
		const options = new RequestOptions({ headers: headers });
		return options;
	}

	public static get loginHeaderOptions(): any {
		const headers = new Headers( { 'Content-Type': 'application/json' } );
		const options = new RequestOptions({ headers: headers });
		return options;
	}

	public static set siteLocations(value: Array<SiteLocation>) {
		this._siteLocations = value;
	}

	public static get siteLocations(): Array<SiteLocation> {
		return this._siteLocations;
	}

	public static get clientList(): Array<Customer> {
		return this._clientList;
	}
	public static set clientList(value: Array<Customer>) {
		this._clientList = value;
	}

	public static get selectedClientIndex(): number {
		return this._selectedClientIndex;
	}
	public static set selectedClientIndex(value: number) {
		this._selectedClientIndex = value;
	}

	public static get whiteMap(): Array<any> {
		return [ { 'stylers': [ { 'color': '#ffffff' } ] } ];
	}

	/**
	 * setter | getter for User profile & RBA
	 */
	public static get currentUser(): any{
		return this._currentUser;
	}
	public static set currentUser(value: any) {
		const usr: User = new User();
		usr.name = String( value.name );
		usr.permDecoder = String( value.permDecoder );
		usr.permission = JSON.parse( value.permission );
		usr.roles = String( value.roles );
		usr.sessionId = String( value.sessionId );

		this.filterRolesForSites(usr.permission, usr);

		this._currentUser = usr;
	}

	public static set setRBA(value: any) {
		const usr: User = this.currentUser;
		usr.hasWifi =  (value.rba.hasWifi === 'true') ? true : false;
		usr.hasACL = (value.rba.hasACL === 'true') ? true : false;
	}

	/**
	 * @param permission
	 * @param usr
	 * Filter & Map permission for MANAGE_SITE_FOR_CUSTOMER
	 */
	private static filterRolesForSites( permission: any , usr: User ) {
		const arr: Array<any> = String( permission.MANAGE_SITE_FOR_CUSTOMER ).split('');

		usr.hasCreateSite 			= (arr[0] === '1') ? true : false;
		usr.hasReadSite 			= (arr[1] === '1') ? true : false;
		usr.hasUpdateSite 			= (arr[2] === '1') ? true : false;
		usr.hasDeleteSite 			= (arr[3] === '1') ? true : false;
		usr.hasDeactivateSite 	    = (arr[4] === '1') ? true : false;
	}

	/**
	* creating form dynamically using an API response
	*/
	public static get dynamicFormElements(): Array<any> {
	    return this._dynamicFormElements;
	}
	public static set dynamicFormElements(value: Array<any>) {
	    this._dynamicFormElements = value;
	}

	public static errorCodeHandler(status, translate, customEvents: CustomEvents, method: string = '') {
		const alertHeading = 'Error';
		let errorBodyText = '',
            showAlertModal = true;

		switch (status) {
			case this.UNAUTHORIZED:
			    showAlertModal = false;
				customEvents.unAuthorizedError.emit( {} );
				this.clearAuth();
				break;
			case this.BAD_REQUEST:
				// pass the message to an alert modal
				translate.get('Error.400').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.NOT_FOUND:
				translate.get('Error.404').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.METHOD_NOT_ALLOWED:
				translate.get('Error.405').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.NOT_ACCEPTABLE:
				translate.get('Error.406').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.PROXY_AUTHENTICATION_REQUIRED:
				translate.get('Error.407').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.REQUEST_TIMEOUT:
				translate.get('Error.408').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.EXPECTATION_FAILED:
				translate.get('Error.417').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.TOO_MANY_REQUESTS:
				translate.get('Error.429').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.UNAVAILABLE_FOR_LEGAL_REASONS:
				translate.get('Error.451').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;

			case this.INTERNAL_SERVER_ERROR:
				translate.get('Error.500').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.NOT_IMPLEMENTED:
				translate.get('Error.501').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.BAD_GATEWAY:
				translate.get('Error.502').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.SERVICE_UNAVAILABLE:
				translate.get('Error.503').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.GATEWAY_TIMEOUT:
				translate.get('Error.504').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.HTTP_VERSION:
				translate.get('Error.505').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			case this.NETWORK_AUTHENTICATION_REQUIRED:
				translate.get('Error.511').subscribe((res: string) => {
					errorBodyText = res;
				});
				break;
			default:
			    showAlertModal = false;
				customEvents.unAuthorizedError.emit( {} );
				this.clearAuth();
			    break;
		}

		if (showAlertModal && customEvents !== null) {
			customEvents.showAlertModalEvt.emit( {show: true, heading: alertHeading, bodyText: errorBodyText } );
			console.warn('Server Error * Code: ' + status + ' method At ' + method);
		}

		translate.get('Error.401').subscribe((res: string) => {
			errorBodyText = res;
		});

		return	errorBodyText;
	}

	public static get selectedTabOnNavs() {
		return this._selectedTabOnNavs;
	}

	public static set selectedTabOnNavs( value: any) {
		this._selectedTabOnNavs = value;
	}
}
