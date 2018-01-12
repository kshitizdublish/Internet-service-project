import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';

declare var jQuery: any;

@Component({
	selector: 'app-alert-modal',
	templateUrl: './alert-modal.component.html',
	styleUrls: ['./alert-modal.component.scss']
})
export class AlertDialogComponent implements OnInit, OnDestroy {

	private showAlertModalSub: Subscription;
	showAlertModal = false;
	modalHeading = '';
	modalStatusIcon = '';
	modalBody = '';
	alertImage = 'Alert Image';

	constructor(private _customEvents: CustomEvents) { }

	ngOnInit() {
		this.showAlertModalSub = this._customEvents.showAlertModalEvt.subscribe((value: any) => {
			if (value.show === true) {
				this.modalHeading = value.heading;
				this.modalStatusIcon = this.getAlertImage(this.modalHeading);
				this.modalBody = value.bodyText;
				this.showAlertModal = value.show;
			}
		});
	}

	getAlertImage(heading) {
		switch (heading) {
			case 'Error':
				this.alertImage = './assets/navs/error-alert-icon.png';
				break;
			case 'Success':
			this.alertImage = './assets/navs/success-alert-icon.png';
				break;
			case 'Warning':
			this.alertImage = './assets/navs/warning-alert-icon.png';
				break;
		}

		return this.alertImage;
	}

	closeDialog() {
		this.showAlertModal = false;
	}

	ngOnDestroy() {
		if (this.showAlertModalSub) {
			this.showAlertModalSub.unsubscribe();
		}
	}

}
