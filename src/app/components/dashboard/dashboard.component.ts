import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../events/customevents';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {

	showLeftPanel = false;
	showToggleMenu = true;
	private showLeftPanelSub: Subscription;

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		this.showLeftPanelSub = this._customEvents.showLeftPanelEvt.subscribe((value: any) => {
			this.showLeftPanel = value.show;
		});
	}

	ngOnDestroy() {
		if (this.showLeftPanelSub) {
			this.showLeftPanelSub.unsubscribe();
		}
	}

}
