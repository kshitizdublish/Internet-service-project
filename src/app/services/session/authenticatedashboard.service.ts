import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomEvents } from '../../events/customevents';
import { AppConfigs } from '../../common/app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticateDashboardService implements CanActivate, CanActivateChild {

  constructor(private _customEvents: CustomEvents) {
  }

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>|Promise<boolean>|boolean {
   if ( !AppConfigs.isValidSession ) {
     this._customEvents.unAuthorizedError.emit({});
     this._customEvents.showHideLoader.emit({ show: false });
   }
   return AppConfigs.isValidSession;
 }

 canActivateChild() {
   return true;
 }

}
