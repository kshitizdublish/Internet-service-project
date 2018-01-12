import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-add-service-panel',
	templateUrl: './add-service-panel.component.html',
	styleUrls: ['./add-service-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AddServicePanelComponent implements OnInit, OnDestroy {

	openWindow = false;
	showHideServicePanelSub: Subscription;
	showwhiteImg = false;
	showwhiteImgInternet = false;
	showwhiteImgSite = false;
	showwhiteImgVpn = false;

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		this.showHideServicePanelSub = this._customEvents.showHideServicePanel.subscribe((value: any) => {
			this.openWindow = value.show;
		});
	}

	onClickAddServiceBtn() {
		this.openWindow = !this.openWindow;
		this._customEvents.showHideOverlayMap.emit({ show: this.openWindow });
	}

	createSite() {
		this._customEvents.createNewSiteEvt.emit({ show: true });
	}

	toggleCreateInternetForm() {
		this._customEvents.toggleCreateInternetFormEvt.emit({ show: true });
	}
	createRemoteAccess() {
		this._customEvents.createRemoteAccessEvt.emit({ show: true });
  }
  createVpn() {
		this._customEvents.createNewVpnEvt.emit( {show: true} );
  }
  ngOnDestroy() {
    if (this.showHideServicePanelSub) {
      this.showHideServicePanelSub.unsubscribe();
    }
	}
}
