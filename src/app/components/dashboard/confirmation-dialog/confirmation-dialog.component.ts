import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
	private showConfirmModalSub: Subscription;
	showConfirmModal = false;
	confirmHeading = '';
	confirmStatusIcon = './assets/navs/delete.png';
	confirmBody = '';

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		this.showConfirmModalSub = this._customEvents.showConfirmModalEvt.subscribe((value: any) => {
			if (value.show === true) {
				this.confirmHeading = value.data.heading;
				this.confirmBody = value.data.bodyText;
				this.showConfirmModal = value.show;
			}
		});
	}

	closeDialog() {
		this.showConfirmModal = false;
	}

	deleteSites() {}

	ngOnDestroy() {
		if (this.showConfirmModalSub) {
			this.showConfirmModalSub.unsubscribe();
		}
	}

}
