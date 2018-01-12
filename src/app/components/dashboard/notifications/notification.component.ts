import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from '../../../services/notification/notification.service';
import { AppConfigs } from '../../../common/app.config';
import { Notification } from '../../../vo/notification/Notification';
import { TranslateService } from 'ng2-translate';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {
	@Input() category: string;

	private notificationType: string;
	private notificationList: any[] = [];
	private isShowNotification: Boolean = false;
	private toggleNotificationEvt: any;

	constructor(
		private _customEvents: CustomEvents,
		private _notificationService: NotificationService,
		private translate: TranslateService
	) {
		this.getAllNotifications();
	}

	getAllNotifications() {
		this._notificationService.getAllNotifications()
			.subscribe((notificationList: any) => {
				if (notificationList.length) {
					notificationList.forEach((obj) => {
						const notification: Notification = new Notification();
						notification.text = obj.text;
						notification.date = this.getParsedDate(obj.date);
						this.notificationList.push(notification);
					});
				}
			}, (error) => {
				AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'getAllNotifications');
			});
	}

	getParsedDate(timestamp) {
		const date = new Date(parseInt(timestamp, 10));
		return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + '  ' +
			date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	}

	ngOnInit() {
		this.translate.get(this.category).subscribe((res: string) => {
			this.notificationType = res;
		});

		this.toggleNotificationEvt = this._customEvents.toggleNotificationEvt.subscribe((value: any) => {
			this.isShowNotification = value.show;
		});
	}

	ngOnDestroy() {
		if (this.toggleNotificationEvt) {
			this.toggleNotificationEvt.unsubscribe();
		}
	}
}
