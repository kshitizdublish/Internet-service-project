import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfigs } from '../../common/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class NotificationService {
  private notificationList: any[] = [];
  constructor(
    private _http: Http
  ) { }

  getAllNotifications() {
    const path = './spoof/notification.json';
    return this._http.get(path, AppConfigs.headerOptions)
    .map((res: any) => {
      return JSON.parse(res._body);
    })
    .catch((error: any) => this.catchError(error));
  }

  catchError(error: any): any {
    return error;
  }
}
