import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-qos-set-panel',
	templateUrl: './qos-set-panel.component.html',
	styleUrls: ['./qos-set-panel.component.scss']
})
export class QosSetPanelComponent implements OnInit, OnDestroy {

	qosSetErrorMsg = '';
	qosSetForm: FormGroup;
	private setQoSParamEvtSub: Subscription;
	siteDetails = {siteName: '', cpe: ''	};

	constructor(
		fb: FormBuilder,
		private _customEvents: CustomEvents
	) {
		this.qosSetForm = fb.group({
			'siteName': ['', Validators.required],
			'cpe': ''
		});
	}

	ngOnInit() {
		this.resetForm();
        this.setQoSParamEvtSub = this._customEvents.setQoSParamEvt.subscribe((value: any) => {
			this.siteDetails.siteName = value.siteData.siteName;
			this.siteDetails.cpe = '';
		});
	}

	// configure the qos parameters for the site
	submitForm(values: any, evt) {
		console.log('QOS Set Paramenters * Configure Btn Clicked');
	}

	resetForm() {
		this.qosSetErrorMsg = '';
		this.qosSetForm.reset();
	}

	closeSetForm() {
		this.resetForm();
		this._customEvents.setQoSParamEvt.emit({ show: false, siteData: {} });
	}

	ngOnDestroy() {
		if (this.setQoSParamEvtSub) {
			this.setQoSParamEvtSub.unsubscribe();
		}
	}

}
