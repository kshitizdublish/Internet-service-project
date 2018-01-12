import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormBuilder} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { ValidateService } from './services/session/validate.service';
import { routes } from './app.routes';
import { LoaderComponent } from './components/spinning/loader.component';
import { CustomEvents } from './events/customevents';
import { LoginService } from './services/login/login.service';
import { GetAllSitesService } from './services/getAllSites/getAllSites.service';
import { CreateSiteService } from './services/create-site/create-site.service';
import { CreateAclService } from './services/create-acl/create-acl.service';
import { AuthenticateService } from './services/session/authenticate.service';
import { StatisticsService } from './services/statistics/statistics.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AgmCoreModule } from '@agm/core';
import { CustomerService } from './services/customer/customer.service';
import { FloatSiteBandwidthService } from './services/float-site-bandwidth/float-site-bandwidth.service';
import { AuthenticateDashboardService } from './services/session/authenticatedashboard.service';
import { NetworkService } from './services/site-info-services/network.services';
import { ConnectivityService } from './services/site-info-services/connectivity.services';
import { ConfigVpnService } from './services/config-vpn/config-vpn.service';
import { AlertDialogComponent } from './components/dashboard/alert-dailog/alert-modal.component';
import { ConfirmationDialogComponent } from './components/dashboard/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from './services/notification/notification.service';
import { CreateVpnService } from './services/create-vpn/create-vpn.service';
import { CreateInternetAccessService } from './services/internet/create-internet-access.service';
import { DynamicFormElementsService } from './services/dynamic-elements/dynamic-form-elements.service';
import { CreateRemoteService } from './services/remote-access/remote-access.service';
import { CreateWifiService } from './services/wifi/create-wifi.service';
import { RbaService } from './services/rba/rba.service';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AlertDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    LoginModule,
    DashboardModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDrDuaRSeqb8Q0QZ9Z_ppQI1DlwlAVVbJM',
			libraries: ['places']
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (httpFactory),
      deps: [Http]
  })
  ],

	providers: [
		FormBuilder,
		CustomEvents,
		LoginService,
		GetAllSitesService,
    CreateSiteService,
    CreateAclService,
    CreateVpnService,
		AuthenticateService,
		StatisticsService,
		ValidateService,
    CustomerService,
    FloatSiteBandwidthService,
    AuthenticateDashboardService,
    NetworkService,
    ConnectivityService,
    ConfigVpnService,
    NotificationService,
    CreateInternetAccessService,
    DynamicFormElementsService,
    CreateRemoteService,
    CreateWifiService,
    RbaService
	],

  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpFactory(http: Http): any {
  return new TranslateStaticLoader(http, './locale/i18n', '.json');
}
