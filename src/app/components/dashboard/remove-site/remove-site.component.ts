import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AppConfigs } from '../../../common/app.config';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';

@Component({
	selector: 'app-remove-site',
	templateUrl: './remove-site.component.html',
	styleUrls: ['./remove-site.component.scss']
})

export class RemoveSiteComponent implements OnInit, OnDestroy {
	removeSiteErrorMsg = '';
	removeSiteForm: FormGroup;
	sitesName: Array <any> = [];
	confirmData = {
		heading: '',
		bodyText: ''
	};

	private getAllSitesNameSub: Subscription;

	constructor(
		fb: FormBuilder,
		private _customEvents: CustomEvents,
		private translate: TranslateService
	) {
		this.removeSiteForm = fb.group({});
	}

	ngOnInit() {
		// populate the site names in the float-site-info component dropdown
		this.getAllSitesNameSub = this._customEvents.getAllSitesNameEvt.subscribe((value: any) => {
			this.getSitesName(AppConfigs.siteLocations);
		});
	}

	getSitesName(data) {
		this.sitesName = [];
		for (let i = 0; i < data.length; i++) {
			const addObj = { id: data[i].id, name: data[i].name, selected: '', location: data[i].location };
			this.sitesName.push( addObj );
		}
	}

	closeRemoveForm() {
		this.resetForm();
		this._customEvents.removeSiteEvt.emit({ show: false });
	}

	resetForm() {
		this.removeSiteErrorMsg = '';
		// uncheck all the checkboxes
		for (let i = 0; i < this.sitesName.length; i++) {
			this.sitesName[i].selected = '';
		}
		this.removeSiteForm.reset();
	}

	// delete the selected sites
	submitForm(values: any, evt) {
		// show a confirmation dialog modal
		this.translate.get('Confirmation.deleteSites.header').subscribe((res: string) => {
			this.confirmData.heading = res;
		});
		this.translate.get('Confirmation.deleteSites.bodyText').subscribe((res: string) => {
			this.confirmData.bodyText = res;
		});
		this._customEvents.showConfirmModalEvt.emit({show: true, data: this.confirmData });
	}

	ngOnDestroy() {
		if (this.getAllSitesNameSub) {
			this.getAllSitesNameSub.unsubscribe();
		}
	}

}
