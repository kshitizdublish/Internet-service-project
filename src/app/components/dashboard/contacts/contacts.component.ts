import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';
import { AppConfigs } from '../../../common/app.config';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit, OnDestroy {
  @ViewChild('agm') agm;
  lat = 52.132633;
	lng = 5.2912659999999505;
  private showProfileMenuSub: Subscription;
  showProfileMenu = false;
  showLocationSearch = false;
  constructor(private _customEvents: CustomEvents) { }

  ngOnInit() {
    this.showProfileMenuSub = this._customEvents.showProfileMenuEvt.subscribe((value: any) => {
			this.showProfileMenu = value.show;
    });
    AppConfigs.selectedTabOnNavs = 3;
  }

  ngOnDestroy() {
		if (this.showProfileMenuSub) {
			this.showProfileMenuSub.unsubscribe();
		}
  }

  closeAllPanels() {
        this._customEvents.toggleNotificationEvt.emit({ show: false });
        this._customEvents.showProfileMenuEvt.emit({ show: false });
  }

}
