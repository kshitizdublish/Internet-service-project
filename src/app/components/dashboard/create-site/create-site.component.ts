import { Component, OnInit, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';

import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { CreateSiteService } from '../../../services/create-site/create-site.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AppConfigs } from '../../../common/app.config';
import { Subscription } from 'rxjs/Subscription';
import { DataObjectUtils } from '../../../utils/DataObjectUtils';

declare var google: any;

@Component({
	selector: 'app-create-site',
	templateUrl: './create-site.component.html',
	styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit, OnDestroy {

	@ViewChild('search')
	public searchElementRef: ElementRef;
	createSiteErrorMsg = '';
	createSiteForm: FormGroup;
	locations: Array<string> = [];
	primaryAccessType: Array<any> = [];
	backUpAccessType: Array<any> = [];
	primaryAccessNetwork: Array<any> = [];
	backUpAccessNetwork: Array<any> = [];
	cpeType: Array<any> = [];
	qosType: Array<any> = [];
	private createNewSiteSub: Subscription;

	siteNameLength = 20;
	editSiteMode = false;

	// Default Lag Log for Netherlands
	// { lat: 52.132633, lng: 5.2912659999999505 };
	newSiteLatLng: any = { lat: 0, lng: 0 };

	/**
	 * will be used while edit as well.
	 * as of now using for name and location only
	 */
	formModal: any;

	constructor(
	 	fb: FormBuilder,
		private _customEvents: CustomEvents,
		private createSiteService: CreateSiteService,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
		private translate: TranslateService
	) {
		this.createSiteForm = fb.group({
			'siteName': ['', Validators.required],
			'location': ['', Validators.required],
			'primaryAccessType': '',
			'backUpAccessType': '',
			'primaryAccessNetwork': '',
			'backUpAccessNetwork': '',
			'cpeType': ['', Validators.required],
			'qosType': ['', Validators.required],
			'description': ''
		});

		this.formModal = {
			siteName: '',
			location: '',
			primaryAccessType: '',
			backUpAccessType: '',
			primaryAccessNetwork: '',
			backUpAccessNetwork: '',
			cpeType: '',
			qosType: '',
			description: ''
		};
	}

	ngOnInit() {
		// load Places Autocomplete for searching location via google map API
		this.mapsAPILoader.load().then(() => {
			const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ['geocode', 'establishment']
			});

			autocomplete.addListener('place_changed', () => {
				this.ngZone.run(() => {
					const place: any = autocomplete.getPlace();
					// verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}
					// set latitude, longitude and zoom
					this.newSiteLatLng.lat = place.geometry.location.lat();
					this.newSiteLatLng.lng = place.geometry.location.lng();
				});
			});
		});

		// reset the form before showing to the user
		this.createNewSiteSub = this._customEvents.createNewSiteEvt.subscribe((value: any) => {
			if (value.show === true) {
				this.editSiteMode = value.editSite;
				this.resetForm();
				if (value.editSite === true) {
					// fill the form as with the selected site data
					this.formModal.siteName = value.obj.name;
					this.formModal.location = value.obj.location;
					this.formModal.primaryAccessType = '';
					this.formModal.backUpAccessType = '';
					this.formModal.primaryAccessNetwork = '';
					this.formModal.backUpAccessNetwork = '';
					this.formModal.cpeType = value.obj.localCpeType;
					this.formModal.qosType = value.obj.qosType;
					this.formModal.description = value.obj.description;
				}
			}
		});
	}

	closeSiteForm() {
		this.resetForm();
		this._customEvents.createNewSiteEvt.emit({ show: false });
	}

	resetForm() {
		// set the create site form elements
		const indexCpe = AppConfigs.dynamicFormElements.findIndex(x  =>  x.name  ===  'cpeType');
		this.cpeType = [];
		this.cpeType = AppConfigs.dynamicFormElements[indexCpe].options;

		const indexPrimaryAccess = AppConfigs.dynamicFormElements.findIndex(x  =>  x.name  ===  'primaryAccessType');
		this.primaryAccessType = [];
		this.primaryAccessType = AppConfigs.dynamicFormElements[indexPrimaryAccess].options;

		const indexPrimaryNetwork = AppConfigs.dynamicFormElements.findIndex(x  =>  x.name  ===  'primaryAccessNetwork');
		this.primaryAccessNetwork = [];
		this.primaryAccessNetwork = AppConfigs.dynamicFormElements[indexPrimaryNetwork].options;

		const indexBackUpNet = AppConfigs.dynamicFormElements.findIndex(x  =>  x.name  ===  'backupAccessNetwork');
		this.backUpAccessNetwork = [];
		this.backUpAccessNetwork = AppConfigs.dynamicFormElements[indexBackUpNet].options;

		const indexBackUpAccess = AppConfigs.dynamicFormElements.findIndex(x  =>  x.name  ===  'backupAccessType');
		this.backUpAccessType = [];
		this.backUpAccessType = AppConfigs.dynamicFormElements[indexBackUpAccess].options;

		const indexQos = AppConfigs.dynamicFormElements.findIndex(x  =>  x.name  ===  'qosType');
		this.qosType = [];
		this.qosType = AppConfigs.dynamicFormElements[indexQos].options;

		// this.backUpAccessNetwork = [];
		this.createSiteErrorMsg = '';
		this.createSiteForm.reset();
	}

	// submit the create site form details
	submitForm(values: any, evt) {
		this.createSiteErrorMsg = '';

		values.location = values.location + '~' + this.newSiteLatLng.lat + '^' + this.newSiteLatLng.lng;
		const formData = {
			'name': values.siteName,
			'location': values.location,
			'primaryAccessType': values.primaryAccessType,
			'backUpAccessType': values.backUpAccessType,
			'primaryAccessNetwork': values.primaryAccessNetwork,
			'backUpAccessNetwork': values.backUpAccessNetwork,
			'cpeType': values.cpeType,
			'qosType': values.qosType,
			'description': values.description
		};

		DataObjectUtils.stripWhiteSpace(formData);
		if (DataObjectUtils.stripWhiteSpace(formData)) {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.createSiteErrorMsg = res;
			});
			return;
		}

		// validate mandatory fields are filled
		if (!evt.target.checkValidity()) {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.createSiteErrorMsg = res;
			});
			return;
		}
		if (this.checkForDuplicateName(values.siteName)) {
			this.translate.get('Commons.error.duplicate').subscribe((res: string) => {
				this.createSiteErrorMsg = res;
			});
			return;
		}

		// check if user has entered valid location name
		if (this.newSiteLatLng.lat === 0 || this.newSiteLatLng.lng === 0) {
			this.translate.get('Commons.error.latlngError').subscribe((res: string) => {
				this.createSiteErrorMsg = res;
			});
			return;
		}

		this._customEvents.showHideLoader.emit({ show: true });

		// based on flag create/update the site information
		if (!this.editSiteMode) {
			// call the create-site API to save the form data
			this.createSiteService.requestCreateSite(formData).subscribe((response: any) => {
				// reset default lat lng
				this.newSiteLatLng = { lat: 0, lng: 0 };
				this.resetForm();
				this.closeSiteForm();
				// call the API for getting the updated sites data
				this._customEvents.getSiteLocationsEvt.emit({});
				this.onHTTPRequestComplete();
				let alertHeading = '';
				this.translate.get('Success.heading').subscribe((res: string) => {
					alertHeading = res;
				});
				let bodyText = '';
				this.translate.get('Success.bodyText').subscribe((res: string) => {
					bodyText = res;
				});
				this._customEvents.showAlertModalEvt.emit({
					show: true,
					heading: alertHeading,
					bodyText: bodyText
				});
			}, (error: any) => {
				this.onHTTPRequestComplete();
				this.getErrorMsg(error);
			});
		} else {
			// call the edit site API to update the form data
			this.createSiteService.requestUpdateSite(formData).subscribe((response: any) => {
				// reset default lat lng
				this.newSiteLatLng = { lat: 0, lng: 0 };
				this.resetForm();
				this.closeSiteForm();
				this.onHTTPRequestComplete();
				// call the API for getting the updated sites data
				this._customEvents.getSiteLocationsEvt.emit({});
			}, (error: any) => {
				this.onHTTPRequestComplete();
				this.getErrorMsg(error);
			});
		}
	}

	onHTTPRequestComplete() {
		this._customEvents.showHideOverlayMap.emit({ show: false });
		this._customEvents.showHideServicePanel.emit({ show: false });
		this._customEvents.createNewSiteEvt.emit({ show: false });
		this._customEvents.showHideLoader.emit({ show: false });
		this._customEvents.createNewVpnEvt.emit( {show: false} );
	}

	checkForDuplicateName(siteName): boolean {
		let isMatched = false;
		for (let i = 0; i < AppConfigs.siteLocations.length; i++) {
			if (String(AppConfigs.siteLocations[i].name) === String(siteName)) {
				isMatched = true;
				break;
			}

		}
		return isMatched;
	}

	getErrorMsg(error) {
		AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'requestCreateSite');
	}

	ngOnDestroy() {
		if (this.createNewSiteSub) {
			this.createNewSiteSub.unsubscribe();
		}
	}
}
