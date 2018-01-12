import { Component, OnInit, Input } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AppConfigs } from '../../../common/app.config';
import { DataObjectUtils } from '../../../utils/DataObjectUtils';
import { CreateInternetAccessService } from '../../../services/internet/create-internet-access.service';

@Component({
	selector: 'app-create-internet-access',
	templateUrl: './create-internet-access.component.html',
	styleUrls: ['./create-internet-access.component.scss']
})
export class CreateInternetAccessComponent implements OnInit {

	@Input() set ddosDeployment(value: any) {
		this.ddosDeploymentOption = [];
		this.ddosDeploymentOption = value;
	}

	private createInternetAccessForm: FormGroup;
	private formModal: any;
	private ddosDeploymentOption: any[] = [];
	private isValid: Boolean = false;
	private isFormValid: Boolean = true;
	private currentSiteList: any[] = [];
	private siteId: any;
	private createInternetAccessErrorMsg: string;

	constructor(
		fb: FormBuilder,
		private _customEvents: CustomEvents,
		private translate: TranslateService,
		private createInternetAccessService: CreateInternetAccessService
	) {

		this.createInternetAccessForm = fb.group({
			'accessName': [
				'',
				Validators.compose([
					Validators.minLength(1)
				])
			],
			'siteName': [
				''
			],
			'allocationQuantity': [
				''
			],
			'ddosDeployment': '',
			'description': ''
		});

		this.formModal = {
			accessName: '',
			siteName: '',
			allocationQuantity: '',
			ddosDeployment: this.ddosDeploymentOption,
			description: '',
		};

	}

	ngOnInit() { }

	getAvailableSites() {
		this.currentSiteList = [];
		this.currentSiteList = AppConfigs.siteLocations.filter((site) => {
			if (this.formModal.siteName) {
				return site.name.toLocaleLowerCase().indexOf(this.formModal.siteName.toLocaleLowerCase()) !== -1;
			} else {
				return AppConfigs.siteLocations;
			}
		});
	}

	selectSite(site: any) {
		this.formModal.siteName = site.name;
		this.siteId = site.id;
		this.currentSiteList = [];
	}

	clearSelectedSite() {
		this.formModal.siteName = '';
		this.siteId = null;
	}

	closeSiteSuggestionBox() {
		this.currentSiteList = [];
	}

	submitCreateInternetAccessForm(formData: any, evt: any) {

		DataObjectUtils.stripWhiteSpace(formData);

		// Set site data on site selection as a part of request param
		formData.siteId = this.siteId;
		this._customEvents.showHideLoader.emit({ show: true });

		this.createInternetAccessService.requestCreateInternetAccess(formData)
		.subscribe(
			(result) => {
				let alertHeading = '';
				this.translate.get('Success.heading').subscribe((res: string) => {
					alertHeading = res;
				});
				let bodyText = '';
				this.translate.get('CreateInternetAccess.successMsg').subscribe((res: string) => {
					bodyText = res;
				});
				this._customEvents.showAlertModalEvt.emit({
					show: true,
					heading: alertHeading,
					bodyText: bodyText
				});
				this.resetInternetAccessForm();
			},
			(error) => {
				this.getErrorMsg(error);
				this.resetInternetAccessForm();
			}
		);
	}

	toggleCreateInternetForm() {
		this.clearCreateInternetAccessForm();
		this.closeSiteSuggestionBox();
		this._customEvents.toggleCreateInternetFormEvt.emit( {show: false} );
	}

	checkForNumberOnly(maxLength: number, limit: number) {
		if ( isNaN(this.formModal.allocationQuantity) ) {
			this.formModal.allocationQuantity = '';
		}

		if ( this.formModal.allocationQuantity.length > maxLength ) {
			this.formModal.allocationQuantity = this.formModal.allocationQuantity.substring(0, maxLength);
		}

		if ( this.formModal.allocationQuantity > limit ) {
			this.formModal.allocationQuantity = limit;
		}

		if (this.formModal.allocationQuantity === '0' || this.formModal.allocationQuantity === 0) {
			this.formModal.allocationQuantity = '';
		}
	}

	isFormActive() {
		this.isValid = true;
		Object.keys(this.formModal).forEach((key) => {
			if ( key !== 'description') {
				if ( this.formModal[key] === '' || this.formModal[key] === null ) {
					this.isValid = false;
				}
			}
		});
		this.isFormValid = this.isValid && this.createInternetAccessForm.valid;
	}

	clearCreateInternetAccessForm() {
		this.createInternetAccessForm.reset();
	}

	resetInternetAccessForm() {
		this._customEvents.showHideLoader.emit({ show: false });
		this.clearCreateInternetAccessForm();
		this.toggleCreateInternetForm();
	}

	getErrorMsg(error: any) {
		AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'submitCreateInternetAccessForm');
	}
}
