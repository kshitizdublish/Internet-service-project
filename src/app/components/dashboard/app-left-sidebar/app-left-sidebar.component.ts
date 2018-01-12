import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CustomEvents } from '../../../events/customevents';
import { AppConfigs } from '../../../common/app.config';

@Component({
	selector: 'app-left-sidebar',
	templateUrl: './app-left-sidebar.component.html',
	styleUrls: ['./app-left-sidebar.component.scss']
})
export class AppLeftSidebarComponent implements OnInit, OnDestroy {
	selectedTab = 0;
	panelItems: any[] = [];
	showLeftPanel = false;
	private showLeftPanelSub: Subscription;

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		this.showLeftPanelSub = this._customEvents.showLeftPanelEvt.subscribe((value: any) => {
			this.showLeftPanel = value.show;
		});
		this.selectedTab = AppConfigs.selectedTabOnNavs;
	}

	closeLeftPanel() {
		this._customEvents.showLeftPanelEvt.emit({show: false });
	}

	onClickClientList() {
		this._customEvents.showClientListEvt.emit({show: true });
	}

	selectCurrentItem(itemIndex: number) {
		this.selectedTab = itemIndex;
	}

	focusCurrentItem(itemIndex: number) {
		this.selectedTab = itemIndex;
	}

	ngOnDestroy() {
		if (this.showLeftPanelSub) {
			this.showLeftPanelSub.unsubscribe();
		}
	}
	openDashBoard() {
		this._customEvents.showLeftPanelEvt.emit({show: false });
		this._customEvents.routToDashBoard.emit({});
	}

	openFeedBack() {
		this._customEvents.routToFeedback.emit({});
	}

	openContacts() {
		this._customEvents.routToContacts.emit({});
	}

}
