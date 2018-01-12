import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConfigs } from '../../../common/app.config';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { DataObjectUtils } from '../../../utils/DataObjectUtils';
import { CreateWifiService } from '../../../services/wifi/create-wifi.service';

@Component({
	selector: 'app-create-wifi',
	templateUrl: './create-wifi.component.html',
	styleUrls: ['./create-wifi.component.scss']
})
export class CreateWifiComponent implements OnInit, OnDestroy {

	private createWifiErrorMsg = '';
	private createWifiSub: Subscription;
	private showSiteBandwidthSub: Subscription;
	private createWifiForm: FormGroup;
	private formModal: any;
	private wifiRule: any;
	private activeRule: any;
	private siteId: any;
	private maxRules = 6;
	private isFormValid: Boolean = false;
	private isValid: Boolean = false;

	// Dynamic form values
	private countryCodeOptions: any[] = [];
	private typeOptions: any[] = [];
	private statusOptions: any[] = [];
	private vlanIdOptions: any[] = [];
	private relativeRadioOptions: any[] = [];
	private authenticationModeOptions: any[] = [];
	private pskEncriptionTypeOptions: any[] = [];

	constructor(
		fb: FormBuilder,
		private _customEvents: CustomEvents,
		private createWifiService: CreateWifiService,
		private translate: TranslateService
	) {

		this.createWifiForm = fb.group({
			ssidName: '',
			name: '',
			countryCode: this.countryCodeOptions,
			type: this.typeOptions,
			vlanId: this.vlanIdOptions,
			status: this.statusOptions,
			relativeRadios: this.relativeRadioOptions,
			authenticationMode: this.authenticationModeOptions,
			pskEncriptionType: this.pskEncriptionTypeOptions,
			securityKey: ''
		});

		this.formModal = {
			name: null,
			countryCode: null,
			wifiRules: []
		};

		this.wifiRule = {
			ssidName: null,
			type: null,
			vlanId: null,
			status: null,
			relativeRadios: null,
			authenticationMode: null,
			pskEncriptionType: null,
			securityKey: '',
			statusOptions: ['Disabled', 'Enabled'],
			isEnable: false
		};
		this.countryCodeOptions = ['NL'];
	}

	ngOnInit() {
		this.addNewWifiRule();
		this.createWifiSub = this._customEvents.createWiFiEvt.subscribe( (val: any) => {

			const indexAuth = AppConfigs.dynamicFormElements.findIndex(ele  =>  ele.name  ===  'authenticationmode');
			this.authenticationModeOptions = [];
			this.authenticationModeOptions = AppConfigs.dynamicFormElements[indexAuth].options;

			const indexRadio = AppConfigs.dynamicFormElements.findIndex(ele  =>  ele.name  ===  'relativeRadios');
			this.relativeRadioOptions = [];
			this.relativeRadioOptions = AppConfigs.dynamicFormElements[indexRadio].options;

			const indexSsid = AppConfigs.dynamicFormElements.findIndex(ele  =>  ele.name  ===  'ssidtype');
			this.typeOptions = [];
			this.typeOptions = AppConfigs.dynamicFormElements[indexSsid].options;

			const indexEncType = AppConfigs.dynamicFormElements.findIndex(ele  =>  ele.name  ===  'pskEncryptType');
			this.pskEncriptionTypeOptions = [];
			this.pskEncriptionTypeOptions = AppConfigs.dynamicFormElements[indexEncType].options;

		});

		this.showSiteBandwidthSub = this._customEvents.showSiteBandwidthEvt.subscribe((val: any) => {
			this.siteId = val.id.id;
			this.createWifiService.getVlanOptions(this.siteId).subscribe(
				(result) => {
					this.vlanIdOptions = [];
					result.data.forEach(element => {
						this.vlanIdOptions.push(element);
					});
				}
			);
		});
	 }

	isFormActive() {
		this.isValid = true;

		if (
			this.formModal.name === '' || this.formModal.name === null ||
			this.formModal.countryCode === '' || this.formModal.countryCode === null
		) {
			this.isValid = false;
		}

		this.formModal.wifiRules.forEach((rule, index, rules) => {
			Object.keys(rule).forEach((eachKey) => {
				if (rules[index][eachKey] === '' || rules[index][eachKey] === null) {
					this.isValid = false;
					return;
				}
				if (eachKey === 'securityKey') {
					if (rules[index][eachKey].length < 8) {
						this.isValid = false;
						return;
					}
				}
			});
		});

		this.isFormValid = this.isValid;
	}

	closeWifiForm() {
		this._customEvents.showDoubleOverLay.emit( {show: false} );
		this._customEvents.createWiFiEvt.emit( {show: false} );
	}

	addNewWifiRule() {
		if (this.formModal.wifiRules.length && !this.isFormValid) {
			return;
		}

		if (this.formModal.wifiRules.length >= this.maxRules) {
			return;
		}
		const newRule = Object.create(this.wifiRule);
		this.formModal.wifiRules.push(newRule);
		this.activeRule = this.formModal.wifiRules.length - 1;

		this.isFormActive();
		this.setwifiRuleStatus(this.activeRule);
	}

	setActiveRule(index: number) {
		this.activeRule = index;
	}

	setwifiRuleStatus(activeRule: number) {
		this.formModal.wifiRules[activeRule].isEnable = !this.formModal.wifiRules[activeRule].isEnable;
		const activeIndex = this.formModal.wifiRules[activeRule].isEnable ? 1 : 0;
		this.formModal.wifiRules[activeRule].status = this.formModal.wifiRules[activeRule].statusOptions[activeIndex];
	}

	removeCurrentRule() {
		this.formModal.wifiRules.splice(this.activeRule, 1);
		if (this.activeRule >= this.formModal.wifiRules.length) {
			this.activeRule = this.formModal.wifiRules.length - 1;
		}
	}

	submitcreateWifiForm(formDate: any) {
		this._customEvents.showHideLoader.emit({ show: true });

		this.createWifiService.requestCreateWifi(this.formModal, this.siteId)
		.subscribe(
			(result) => {
				let alertHeading = '';
				this.translate.get('Success.heading').subscribe((res: string) => {
					alertHeading = res;
				});
				let bodyText = '';
				this.translate.get('CreateWifi.form.successMsg').subscribe((res: string) => {
					bodyText = res;
				});
				this._customEvents.showAlertModalEvt.emit({
					show: true,
					heading: alertHeading,
					bodyText: bodyText
				});
				this.resetWifiForm();
			},
			(error) => {
				this.getErrorMsg(error);
				this.resetWifiForm();
			}
		);
	}

	resetWifiForm() {
		this._customEvents.showDoubleOverLay.emit( {show: false} );
		this._customEvents.showHideLoader.emit({ show: false });
		this.createWifiForm.reset();
		this.closeWifiForm();
	}

	getErrorMsg(error: any) {
		AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'submitcreateWifiForm');
	}

	ngOnDestroy() {
		this.createWifiSub.unsubscribe();
		this.showSiteBandwidthSub.unsubscribe();
	}
}
