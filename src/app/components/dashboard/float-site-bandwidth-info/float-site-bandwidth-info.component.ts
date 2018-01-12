import { Component, OnInit } from '@angular/core';
import { FloatSiteBandwidthService } from '../../../services/float-site-bandwidth/float-site-bandwidth.service';
import { CustomEvents } from '../../../events/customevents';

@Component({
	selector: 'app-float-site-bandwidth-info',
	templateUrl: './float-site-bandwidth-info.component.html',
	styleUrls: ['./float-site-bandwidth-info.component.scss']
})
export class FloatSiteBandwidthInfoComponent implements OnInit {
	private bandwidthPopupActive = true;
	bandwidthDetails: Array<any> = [];
	aggregateBandwidth: Array<any> = [];
	selectDays: Array<string> = [];
	bandwidthData: Array<any> = [];
	colorScheme = {
		domain: ['#F2B533', '#E55856', '#97C5C2']
	};

	constructor(private _customEvents: CustomEvents, private _bandwidthService: FloatSiteBandwidthService) {
		this.selectDays = [
			'Today',
			'Yesterday',
			'Last Week',
			'Last Month',
			'Last two Months'
		];
		this.maxDate = new Date();
		this.maxDate.setDate(this.maxDate.getDate() + 1);
	}

	fromDateShowPicker = false; toDateShowPicker = false;
	fromDate: Date = new Date();
	toDate: Date = new Date();
	showDate = true;
	showTime = true;
	minDate: Date;
	maxDate: Date;
	closeButton: any = { show: true, label: 'Close', cssClass: 'btn btn-sm btn-primary btn-datetimepicker' };

	onTogglePicker(selectedPicker) {
		if (this.fromDateShowPicker === false && selectedPicker === 'fromDate') {
			this.fromDateShowPicker = true;
		}
		if (this.toDateShowPicker === false && selectedPicker === 'toDate') {
			this.toDateShowPicker = true;
		}
	}

	onFromDateChange(val: Date) {
		this.fromDate = val;
		this.minDate = val;
		this.minDate.setDate(this.minDate.getDate());
	}
	onToDateChange(val: Date) {
		this.toDate = val;
	}
	isValid(): boolean {
		// this function is only here to stop the datepipe from erroring if someone types in value
		return this.fromDate && (typeof this.fromDate !== 'string') && !isNaN(this.fromDate.getTime());
	}

	ngOnInit() {
		this._customEvents.showSiteBandwidthEvt.subscribe((value: any) => {
			if (value.id) {
				// not required as of now
				this.showSiteBandwidthUtiliz();
			}
		});
	}

	toggleBandwidthPopup(event) {
		// for toggle site bandwidth body
		this.bandwidthPopupActive = !this.bandwidthPopupActive;
	}

	showSiteBandwidthUtiliz() {
		this._bandwidthService.getSiteBandwidthInfo().subscribe((resp: any) => {
			this.bandwidthDetails = this.shuffle(resp.bandwidth);
			this.aggregateBandwidth = this.bandwidthDetails[0]; // TODO: Need to remove later
			this._customEvents.sendsiteBandwidthJSONEvt.emit({ resp });
		});
	}
	shuffle(data) { // TODO: need to remove one api integration
		let m = data.length, t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = data[m];
			data[m] = data[i];
			data[i] = t;
		}
		return data;
	}

	onChangeDay(option) {
		console.log(' SITE BANDWIDTH POPUP * onChangeDay : Selected Option = ' + option);
	}
}
