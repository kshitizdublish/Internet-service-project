import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../events/customevents';

@Component({
	selector: 'app-loader',
	templateUrl: 'loader.component.html',
	styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

	showLoader = false;
	showHideListener: any;

	constructor(private _customEvents: CustomEvents) {

		this.showHideListener = this._customEvents.showHideLoader.subscribe((value: any) => {
			this.showLoader = value.show;
		});

	}

	ngOnDestroy() {
		if (this.showHideListener) {
			this.showHideListener.unsubscribe();
		}
	}

	ngOnInit() {

	}

}
