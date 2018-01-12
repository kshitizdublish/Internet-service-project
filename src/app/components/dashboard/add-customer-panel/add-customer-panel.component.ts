import { Component, OnInit } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AppConfigs } from '../../../common/app.config';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
	selector: 'app-add-customer-panel',
	templateUrl: './add-customer-panel.component.html',
	styleUrls: ['./add-customer-panel.component.scss']
})

export class AddCustomerPanelComponent implements OnInit {

	formErrorMsg = '';
	addCustomer: FormGroup;

	constructor(
		fb: FormBuilder,
		private _customEvents: CustomEvents,
		private _customerService: CustomerService,
		private translate: TranslateService
	) {
		this.addCustomer = fb.group({
			'customerName': ['', Validators.required],
			'email': ['', Validators.required],
			'phone': ['', Validators.required],
			'location': ['', Validators.required],
			'address': ['', Validators.required],
			'city': ['', Validators.required],
			'country': ['', Validators.required],
			'pincode': ['', Validators.required]
		});
	}

	ngOnInit() {
		this.resetForm();
	}

	// submit the config VPN form details
	submitForm(values: any, evt) {
		// validate mandatory fields are filled
		if (!evt.target.checkValidity()) {
			this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.formErrorMsg = res;
			});
			return;
		}
		if (this.checkForDuplicateName(values.siteName)) {
			this.translate.get('Commons.error.duplicate').subscribe((res: string) => {
				this.formErrorMsg = res;
			});
			return;
		}

		const formData = {
			'customerName': values.customerName,
			'email': values.email,
			'phone': values.phone,
			'location': values.location,
			'address': values.address,
			'city': values.city,
			'country': values.country,
			'pincode': values.pincode
		};

		this._customEvents.showHideLoader.emit({ show: true });
		// call the create-site API to save the form data
		this._customerService.addCustomer(formData).subscribe((response: any) => {
			this.resetForm();
			this.closeCustomerPanel();
			this._customEvents.showHideLoader.emit({ show: false });
			// call the API for getting the updated sites data
			// this._customEvents.getSiteLocationsEvt.emit({});
		}, (error: any) => {
			this._customEvents.showHideLoader.emit({ show: false });
			this.getErrorMsg(error);
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

	getErrorMsg(error) {
		switch (error.status) {
			case 500:
				this.translate.get('Commons.error.internalError').subscribe((res: string) => { this.formErrorMsg = res; });
				break;
			default:
				this.translate.get('Commons.error.defaultError').subscribe((res: string) => { this.formErrorMsg = res; });
				break;
		}
	}

	resetForm() {
		this.addCustomer.reset();
	}

	closeCustomerPanel() {
		this._customEvents.showAddCustomerEvt.emit({ show: false });
	}
}
