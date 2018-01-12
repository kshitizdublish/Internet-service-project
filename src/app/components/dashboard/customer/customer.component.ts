import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { CustomEvents } from '../../../events/customevents';
import { CustomerService } from '../../../services/customer/customer.service';
import { TranslateService } from 'ng2-translate';
import { Customer } from '../../../vo/customer/Customer';
import { AppConfigs } from '../../../common/app.config';
import { DynamicFormElementsService } from '../../../services/dynamic-elements/dynamic-form-elements.service';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})

/**
 * Customer View on Tile List view Mode
 * This will be 1st screen to be loaded on dashboard
 * This will be visible for 1st load only
 */
export class CustomerComponent implements OnInit, OnDestroy {

	customerList: Array<any> = [];
	filterList: Array<any> = [];
	showProfileMenuFlag = false;

	constructor(
		private _customEvents: CustomEvents,
		private _clientlistService: CustomerService,
		private translate: TranslateService,
		private _dynamicElementsService: DynamicFormElementsService) { }

	ngOnInit() {
		this.fetchCustomerList();
	}

	fetchCustomerList() {

		this._clientlistService.getCustomerList().subscribe((resp: any) => {
			this.customerList = [];
			AppConfigs.clientList = [];
			this.filterList = [];

			for (let i = 0; i < resp.length; i++) {

				if (String(resp[i].accountType).toLowerCase() === 'customer') {
					const customer: Customer = new Customer();
					customer.id = String(resp[i].tenantName + Math.random() * 1000 + Date.now());
					customer.customerName = String(resp[i].customerName);
					customer.tenantName = String(resp[i].tenantName);
					customer.location = (String(resp[i].location) !== 'undefined') ? String(resp[i].location) : '';
					customer.isSelected = (i === AppConfigs.selectedClientIndex) ? true : false;
					customer.logoPath = String('./assets/navs/username.png');
					AppConfigs.clientList.push(customer);
					this.filterList.push(customer);
				}

			}

			this.filterCustomerRows();

			// call a function to get dynamic elements for a form
			this.getDynamicElements();
		}, (error) => {
			AppConfigs.errorCodeHandler( error.status, this.translate, this._customEvents, 'getCustomerList');
		});

	}

	/**
	 * filter out & make row wise list
	 * each row will have max 6 items
	 * rest will be nex row
	 */
	filterCustomerRows() {
		let count = 0;
		let rowItem;
		this.customerList = [];
		for (let i = 0; i < this.filterList.length; i++) {
			if (count === 0) {
				rowItem = [];
			}

			if (count <= 6) {
				count++;
				rowItem.push(this.filterList[i]);
				if (count === 6) {
					count = 0;
					this.customerList.push(rowItem);
				}
			}
		}

		// push remaining items
		if (rowItem && count > 0) {
			this.customerList.push(rowItem);
		}
	}

	searchClient(value: any) {
		let filterRes;
		filterRes = AppConfigs.clientList.filter((list) => {
			return list.customerName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 ||
				list.tenantName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1;
		});

		this.filterList = [];
		this.filterList = filterRes;
		this.filterCustomerRows();
	}

	onCustomerSelection(customer: Customer) {
		AppConfigs.selectedClientIndex = AppConfigs.clientList.findIndex(x => x.id === customer.id);
		this._customEvents.getSiteLocationsEvt.emit({ success: true });
	}

	// showing the logout/profile options on click of profile picture
	showProfileMenu() {
		this.showProfileMenuFlag = !this.showProfileMenuFlag;
	}

	// get the dynamic form elements from an API
	getDynamicElements() {
		this._dynamicElementsService.requestFormElements().subscribe((response: any) => {
			AppConfigs.dynamicFormElements = JSON.parse(response._body);
		}, (error: any) => {
			AppConfigs.errorCodeHandler( error.status, this.translate, this._customEvents, 'getDynamicElements' );
			console.warn('CUSTOMER * getDynamicElements - Error' + error);
		});
	}

	ngOnDestroy() {

	}

}
