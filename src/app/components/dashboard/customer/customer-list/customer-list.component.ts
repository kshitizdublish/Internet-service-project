import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CustomEvents } from '../../../../events/customevents';
import { AppConfigs } from '../../../../common/app.config';
import { Customer } from '../../../../vo/customer/Customer';
import { TranslateService, TranslateDirective } from 'ng2-translate';

@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

	@ViewChild('searchTxt') searchTxt;

	customerList: Array<Customer> = [];
	filterargs = { location: '' };
	private showClientListSub: Subscription;
	private getSiteLocationsSub: Subscription;
	showCustomerPanel = false;

	constructor(
		private _customEvents: CustomEvents,
		private translate: TranslateService
	) {
	}

	ngOnInit() {
		this.getSiteLocationsSub = this._customEvents.getSiteLocationsEvt.subscribe((value: any) => {
			this.customerList = [];
			this.customerList = AppConfigs.clientList;
		});

		this.showClientListSub = this._customEvents.showClientListEvt.subscribe((value: any) => {
			if (value.show === false) {
				this.filterargs = { location: '' };
				this.searchTxt.nativeElement.value = '';
			}
		});
	}

	closeClientList() {
		this._customEvents.showClientListEvt.emit({ show: false });
	}

	searchClient(value: any) {
		this.filterargs = { location: value };
	}

	showClientLocation(client) {
		this.customerList.forEach((cObj: Customer) => { cObj.isSelected = false; });
		const index = this.customerList.findIndex(x => x.id === client.id);
		if (index !== AppConfigs.selectedClientIndex) {
			AppConfigs.selectedClientIndex = this.customerList.findIndex(x => x.id === client.id);
			this._customEvents.getSiteLocationsEvt.emit({ success: true });
		}
		this.customerList[index].isSelected = true;
		this.closeClientList();
	}

	ngOnDestroy() {
		if (this.showClientListSub) {
			this.showClientListSub.unsubscribe();
		}

		if (this.getSiteLocationsSub) {
			this.getSiteLocationsSub.unsubscribe();
		}
	}
}
