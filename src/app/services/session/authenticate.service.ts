import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ValidateService } from './validate.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticateService implements CanActivate, CanActivateChild {

  constructor(private _validateService: ValidateService) {
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>|Promise<boolean>|boolean {
    return this._validateService.validateSession();
  }

  canActivateChild() {
    return true;
  }

}
