import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SiteInfo } from '../../../vo/sites-info/site-info';
import { Subscription } from 'rxjs/Subscription';
import { CustomEvents } from '../../../events/customevents';
import { StatisticsService } from '../../../services/statistics/statistics.service';
import { AppConfigs } from '../../../common/app.config';
import { TranslateService } from 'ng2-translate';
import { SiteInfoItem } from '../../../vo/sites-info/site-info-item';

@Component({
	selector: 'app-float-site-info',
	templateUrl: './float-site-info.component.html',
	styleUrls: ['./float-site-info.component.scss']
})

export class FloatSiteInfoComponent implements OnInit, OnDestroy {
	@Input() siteInfo: SiteInfo = new SiteInfo();
	@Output() topologyData: EventEmitter<any> = new EventEmitter();
	private getSiteLocationsEvtSub: Subscription;
	private onCompleteCustomerListSub: Subscription;
	public siteInfoArray: SiteInfoItem[] = [];

	constructor(
		private _statisticsService: StatisticsService,
		private _customEvents: CustomEvents,
		private translate: TranslateService
	) { }

	ngOnInit() {
		this.getSiteLocationsEvtSub = this._customEvents.getSiteLocationsEvt.subscribe((value: any) => {
			this.getAllStatistics();
		});
	}

	getAllStatistics() {
		this._customEvents.showHideLoader.emit({ show: true });
		this._statisticsService.requestAllStatistics().subscribe((response: any) => {
			this._customEvents.showHideLoader.emit({ show: false });
			const allStatistics: Array<any> = JSON.parse(response._body);
			this.assignValue(allStatistics);
			this.topologyData.emit(allStatistics);
		}, (error: any) => {
			this._customEvents.showHideLoader.emit({ show: false });
			const emptyStats = new SiteInfo();
			this.assignValue(emptyStats);
			AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'requestAllStatistics');
		});
	}

	// populate the value of statistics to the site info object
	assignValue(data) {
		this.siteInfoArray = [];
		SiteInfo.SiteInfoMetaData.forEach((info, index) => {
			const siteInfo = new SiteInfoItem();
			siteInfo.name = info.name;
			siteInfo.imgPath = info.imgPath;
			siteInfo.activeImgPath = info.activeImgPath;
			siteInfo.value = data[info.attr];
			siteInfo.isSelected = false;
			siteInfo.status = info.status;
			this.siteInfoArray.push(siteInfo);
		});
		// TODO : get all below value in statistics response to populate dynamically
		this.siteInfoArray[0].value = AppConfigs.siteLocations.length;
		this.siteInfoArray[1].value = AppConfigs.siteLocations
										.filter((value) => String(value.runningStatus).toLowerCase() === 'online' ).length;
		this.siteInfoArray[2].value = AppConfigs.siteLocations
										.filter((value) => String(value.runningStatus).toLowerCase() === 'offline' ).length;
		this.siteInfoArray[3].value = AppConfigs.siteLocations
										.filter((value) => String(value.runningStatus).toLowerCase() === 'deactive' ).length;
		this.siteInfoArray[0].isSelected = true;
	}

	// append '0' if value < 10
	appendZero(value) {
		return value = (value < 10 && value > 0) ? ('0' + value) : value;
	}

	itemSelected(index: number) {
		this.siteInfoArray.forEach((item) => {
			item.isSelected = false;
		});
		this.siteInfoArray[index].isSelected = true;
	}
	ngOnDestroy() {
		if (this.getSiteLocationsEvtSub) {
			this.getSiteLocationsEvtSub.unsubscribe();
		}
	}

}
