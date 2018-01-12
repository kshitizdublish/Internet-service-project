import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AppConfigs } from '../../../common/app.config';
import { CreateRemoteService } from '../../../services/remote-access/remote-access.service';
import { DataObjectUtils } from '../../../utils/DataObjectUtils';
import { GetIPVPN } from '../../../vo/ipvpn/get-ipvpn';

@Component({
	selector: 'app-remote-access',
	templateUrl: './remote-access.component.html',
	styleUrls: ['./remote-access.component.scss']
})
export class RemoteAccessComponent implements OnInit, OnDestroy {
	private createRemoteForm: FormGroup;
	private formModal: any;
	private createRemoteAccessSub: Subscription;
	private ipvpnList: Array<GetIPVPN> = [];

	createRemoteErrorMsg = '';

	constructor(fb: FormBuilder,
		private translate: TranslateService,
		private _customEvents: CustomEvents,
		private createRemoteService: CreateRemoteService
	) {
		this.createRemoteForm = fb.group({
			'vpnId': ['', Validators.required],
			'maxOnlineUser': ['', Validators.required]
		});

		this.formModal = {
			'vpnId': '',
			'maxOnlineUser': ''
		};
	}

	ngOnInit() {
		// Show/Hide remote access form
		this.createRemoteAccessSub = this._customEvents.createRemoteAccessEvt.subscribe((value: any) => {
			if (value.show === true) {
				this.getVPNList();
			}
		});
	}

	getVPNList() {
		this.ipvpnList = [];
		this.createRemoteService.getAllIpvpnData().subscribe( (val ) => {
			const getVPNList = val.objects as Array<any>;
			getVPNList.forEach( ( item ) => {
				const addObj = new GetIPVPN();
				addObj.actionState = item.actionState;
				addObj.createtime = item.createtime;
				addObj.id = item.id;
				addObj.layer = item.layer;
				addObj.name = item.name;
				addObj.tenantId = item.tenantId;
				addObj.topology = item.topology;
				addObj.updatetime = item.updatetime;

				addObj.value = item.id;
				addObj.label = item.name;
				this.ipvpnList.push(addObj);
			});
		});
	}

	// submit the create site form details
	submitForm(values: any, evt) {
		this.createRemoteErrorMsg = '';

		if (this.ipvpnList.length === 0) {
			this.translate.get('CreateRemoteAccess.ErrorNoVPN').subscribe((res: string) => {
				this.createRemoteErrorMsg = res;
			});
			return;
		}
		if (!evt.target.checkValidity()) {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.createRemoteErrorMsg = res;
			});
			return;
		}

		const formData = {
			'vpnId': values.vpnId,
			'maxOnlineUser': values.maxOnlineUser,
		};
		DataObjectUtils.stripWhiteSpace(formData);
		if (DataObjectUtils.stripWhiteSpace(formData)) {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.createRemoteErrorMsg = res;
			});
			return;
		}

		this._customEvents.showHideLoader.emit({ show: true });
		// call the create remote-access API to save the form data
		this.createRemoteService.requestCreateRemote(formData).subscribe((response: any) => {
			this.resetForm();
			this.closeRemoteForm();
			// call the API for getting the updated sites data
			this._customEvents.getSiteLocationsEvt.emit({});
			let alertHeading = '';
			this.translate.get('Success.heading').subscribe((res: string) => {
				alertHeading = res;
			});
			let bodyText = '';
			this.translate.get('CreateRemoteAccess.success').subscribe((res: string) => {
				bodyText = res;
			});
			this._customEvents.showAlertModalEvt.emit({
				show: true,
				heading: alertHeading,
				bodyText: bodyText
			});

			this.onHTTPRequestComplete();
		}, (error: any) => {
			this.resetForm();
			this.onHTTPRequestComplete();
			this.getErrorMsg(error);
		});
	}

	onHTTPRequestComplete() {
		this._customEvents.showHideOverlayMap.emit( {show: false} );
		this._customEvents.showHideServicePanel.emit( {show: false} );
		this._customEvents.createNewSiteEvt.emit( {show: false} );
		this._customEvents.showHideLoader.emit({ show: false });
	}

	getErrorMsg(error) {
		AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'requestCreateSite');
	}

	checkForNumberOnly(maxLength: number, limit: number) {
		if ( isNaN(this.formModal.maxOnlineUser) ) {
			this.formModal.maxOnlineUser = '';
		}
		if ( this.formModal.maxOnlineUser.length > maxLength ) {
			this.formModal.maxOnlineUser = this.formModal.maxOnlineUser.substring(0, maxLength);
		}
		if ( this.formModal.maxOnlineUser > limit ) {
			this.formModal.maxOnlineUser = limit;
		}

		if (this.formModal.maxOnlineUser === '0' || this.formModal.maxOnlineUser === 0) {
			this.formModal.maxOnlineUser = '';
		}
	}

	resetForm() {
		this.createRemoteErrorMsg = '';
		this.createRemoteForm.reset();
	}

	closeRemoteForm() {
		this.resetForm();
		this._customEvents.createRemoteAccessEvt.emit({ show: false });
	}

	ngOnDestroy() {
		if (this.createRemoteAccessSub) {
			this.createRemoteAccessSub.unsubscribe();
		}
	}

}
