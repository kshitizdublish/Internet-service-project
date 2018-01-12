import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import { AppConfigs } from '../../../common/app.config';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit, OnDestroy {

    hideSearch = false;
    showLocationSearch = false;
    showClientListPanelAttr = false;
    createFeedBackForm: FormGroup;
    createSiteErrorMsg = '';
    formModal: any;
    private showProfileMenuSub: Subscription;
    showProfileMenu = false;
    private isValid: Boolean = false;

    constructor(
        private _customEvents: CustomEvents,
        fb: FormBuilder,
        private translate: TranslateService
    ) {
        this.createFeedBackForm = fb.group({
			      'contactName': ['', Validators.required],
                  'phone': ''
		    });

        this.formModal = {
			      contactName: '',
                  phone: ''
		    };
    }

    ngOnInit() {
        this.showProfileMenuSub = this._customEvents.showProfileMenuEvt.subscribe((value: any) => {
			this.showProfileMenu = value.show;
        });
        AppConfigs.selectedTabOnNavs = 2;
    }

    ngOnDestroy() {
		if (this.showProfileMenuSub) {
			this.showProfileMenuSub.unsubscribe();
		}
    }

    submitForm(values: any, evt) {
        this.createSiteErrorMsg = '';
        // validate mandatory fields are filled
		    if (!evt.target.checkValidity()) {
			      this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				    this.createSiteErrorMsg = res;
			      });
			  return;
		    } else {
                let alertHeading = '';
                this.translate.get('successPopup.heading').subscribe((res: string) => {
                alertHeading = res;
            });
                let bodyText = '';
                this.translate.get('successPopup.body').subscribe((res: string) => {
                bodyText = res;
            });
                this._customEvents.showAlertModalEvt.emit({
                show: true,
                heading: alertHeading,
                bodyText: bodyText
            });
        }
    }

    closeAllPanels() {
        this._customEvents.toggleNotificationEvt.emit({ show: false });
        this._customEvents.showProfileMenuEvt.emit({ show: false });
    }

    checkForNumberOnly(maxLength: number, limit: number) {
		if ( isNaN(this.formModal.phone) ) {
			this.formModal.phone = '';
		}

		if ( this.formModal.phone.length > maxLength ) {
			this.formModal.phone = this.formModal.phone.substring(0, maxLength);
		}

		if ( this.formModal.phone > limit ) {
			this.formModal.phone = limit;
		}

		if (this.formModal.phone === '0' || this.formModal.phone === 0) {
			this.formModal.phone = '';
		}
	}
}
