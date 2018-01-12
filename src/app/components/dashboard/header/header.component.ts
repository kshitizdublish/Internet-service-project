import { Component, OnInit, NgModule, OnDestroy, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppConfigs } from '../../../common/app.config';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input() showClientListPanelAttr = true;
	@Input() showLocationSearch: Boolean = true;
	showToggleMenu = true;
	clientName = '';
	userName = '';
	listView = false;
	private getSiteLocationsSub: Subscription;
	private showClientListSub: Subscription;
	showClientList = false;
	private showToggleMenuSub: Subscription;

	constructor(private _customEvents: CustomEvents) {
	}

	ngOnInit() {
		this.getSiteLocationsSub = this._customEvents.getSiteLocationsEvt.subscribe((value: any) => {
			this.clientName = String( AppConfigs.clientList[ AppConfigs.selectedClientIndex ].customerName );
		});
		this.userName = AppConfigs.currentUser.name;

		this.showClientListSub = this._customEvents.showClientListEvt.subscribe((value: any) => {
			this.showClientList = value.show;
		});

		this.showToggleMenuSub = this._customEvents.showLeftPanelEvt.subscribe((value: any) => {
			this.showToggleMenu = !value.show;
		});
	}

	toggleClientList() {
		this._customEvents.showClientListEvt.emit({show: true });
	}

	showLeftPanel() {
		this._customEvents.showLeftPanelEvt.emit( {show: true} );
	}

	toggleNotifications() {
		this._customEvents.toggleNotificationEvt.emit({show: true});
	}

	// showing the logout/profile options on click of profile picture
	showProfileMenu() {
		this._customEvents.showProfileMenuEvt.emit({ show: true });
	}

	ngOnDestroy() {
		if (this.getSiteLocationsSub) {
		    this.getSiteLocationsSub.unsubscribe();
		}
		if (this.showToggleMenuSub) {
			this.showToggleMenuSub.unsubscribe();
		}
	}

}
