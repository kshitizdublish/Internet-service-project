import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AppConfigs } from './common/app.config';
import { CustomEvents } from './events/customevents';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private routeSub: Subscription;
	private dashboardSub: Subscription;
	private unAuthorizedSub: Subscription;
	private langChangeSub: Subscription;
	private feedbackSub: Subscription;
	private contactsSub: Subscription;
	private authValidateCompleteSub: Subscription;

	private currentURL = '';

	constructor(private translate: TranslateService,
		private _route: Router,
		private _customEvents: CustomEvents) {
		console.log('Build V:- ' + AppConfigs.APP_VERSION);
		console.log('Environment :- ' + AppConfigs.env.name);

		translate.addLangs(['en', 'nl']);
		translate.setDefaultLang('en');
	}

	ngOnInit() {
		this.routeSub = this._route.events.subscribe((evt: any) => {
			if ( String(evt.url).toLowerCase() !== '/') {
				this.currentURL = evt.url;
			}
		});

		this.dashboardSub = this._customEvents.routToDashBoard.subscribe((value: any) => {
			this._route.navigate(['/dashboard/home']);
		});

		this.feedbackSub = this._customEvents.routToFeedback.subscribe((value: any) => {
			 this._route.navigate(['/dashboard/feedback']);
		});

		this.contactsSub = this._customEvents.routToContacts.subscribe((value: any) => {
			this._route.navigate(['/dashboard/contacts']);
		});

		this.authValidateCompleteSub = this._customEvents.authValidateComplete.subscribe((value: any) => {
			this._route.navigate([this.currentURL]);
		});

		this.unAuthorizedSub = this._customEvents.unAuthorizedError.subscribe((value: any) => {
			// void multiple calls
			if (this.currentURL !== '/') {
				this._route.navigate(['/']);
				this.currentURL = '/';
			}
		});

		this.langChangeSub = this._customEvents.langChangeEvt.subscribe((value: any) => {
			this.translate.use(value.lang);
		});

	}

	/* ngOnChanges() { }
	ngDoCheck() { }
	ngAfterContentInit() { }
	ngAfterContentChecked() { }
	ngAfterViewInit() { }
	ngAfterViewChecked() { } */

	ngOnDestroy() {
		if (this.routeSub) {
			this.routeSub.unsubscribe();
		}
		if (this.unAuthorizedSub) {
			this.unAuthorizedSub.unsubscribe();
		}
		if (this.langChangeSub) {
			this.langChangeSub.unsubscribe();
		}

		if (this.authValidateCompleteSub) {
			this.authValidateCompleteSub.unsubscribe();
		}
	}
}
