import { Component, OnInit } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { CreateSiteService } from '../../../services/create-site/create-site.service';
import { AppConfigs } from '../../../common/app.config';
import { ConfigVpnService } from '../../../services/config-vpn/config-vpn.service';

@Component({
	selector: 'app-vpn-config',
	templateUrl: './vpn-config.component.html',
	styleUrls: ['./vpn-config.component.scss']
})

export class VpnConfigComponent implements OnInit {

	// public searchElementRef: ElementRef;
	configVPNErrorMsg = '';
	configVPNForm: FormGroup;
	siteList: Array<any> = [];
	vpnLayer: Array<any> = [];
	vpnTopology: Array<any> = [];
	constructor(
		fb: FormBuilder,
		private _customEvents: CustomEvents,
		private _configVpnService: ConfigVpnService,
		private translate: TranslateService
	) {
		this.configVPNForm = fb.group({
			'vpnName': ['', Validators.required],
			'selectSite': ['', Validators.required],
			'selectLayer': ['', Validators.required],
			'topologyType': ['', Validators.required],
			'description': ''
		});
	}

	ngOnInit() {
		this.resetForm();
		this.siteList = [
			{
				description: 'Amsterdam',
				id: 1
			},
			{
				description: 'Roterdam',
				id: 2
			},
			{
				description: 'Utricht',
				id: 3
			},
			{
				description: 'Arnhem',
				id: 4
			}
		];

		this.vpnLayer = [
			{
				description: 'L2',
				id: 1
			},
			{
				description: 'L3',
				id: 2
			}
		];

		this.vpnTopology = [
			{
				description: 'Full Mesh',
				id: 1
			},
			{
				description: 'Hub Spoke',
				id: 2
			}
		];

	}

	// submit the config VPN form details
	submitForm(values: any, evt) {
		// validate mandatory fields are filled
		if (!evt.target.checkValidity()) {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.configVPNErrorMsg = res;
			});
			return;
		}
		if (this.checkForDuplicateName(values.siteName)) {
			this.translate.get('Commons.error.duplicate').subscribe((res: string) => {
				this.configVPNErrorMsg = res;
			});
			return;
		}

		const formData = {
			'vpnName': values.vpnName,
			'description': values.description,
			'selectSite': values.selectSite,
			'selectLayer': values.selectLayer,
			'topologyType': values.topologyType
		};

		this._customEvents.showHideLoader.emit({ show: true });
		// call the create-site API to save the form data
		this._configVpnService.requestConfigVPN(formData).subscribe((response: any) => {
			this.resetForm();
			this.closeConfigVPN();
			this._customEvents.showHideLoader.emit({ show: false });
			// call the API for getting the updated sites data
			this._customEvents.getSiteLocationsEvt.emit({});
		}, (error: any) => {
			this._customEvents.showHideLoader.emit({ show: false });
			this.errorHandler( error.status, this._customEvents, 'requestConfigVPN');
		});

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

	errorHandler( status: string , customEvents: CustomEvents, method: string) {
		AppConfigs.errorCodeHandler( status, this.translate, customEvents, method);
	}

	resetForm() {
		this.configVPNForm.reset();
	}

	closeConfigVPN() {
		this._customEvents.configVPN.emit({ show: false });
	}

}
