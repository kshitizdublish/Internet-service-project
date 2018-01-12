import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Md2Module } from 'md2';
import { DashboardComponent } from './dashboard.component';
import { SharedModule} from '../../common/SharedModule';
import { HomeComponent } from './home/home.component';
import { HeaderComponent} from './header/header.component';
import { AppLeftSidebarComponent } from './app-left-sidebar/app-left-sidebar.component';
import { FloatSiteInfoComponent } from './float-site-info/float-site-info.component';
import { SiteInfoItemComponent} from './float-site-info/site-info-item/site-info-item.component';
import { SiteInfoPanelComponent } from './site-info-panel/site-info-panel.component';
import { CreateSiteComponent } from './create-site/create-site.component';
import { SelfProvisionComponent } from './self-provision/self-provision.component';
import { FloatSiteBandwidthInfoComponent } from './float-site-bandwidth-info/float-site-bandwidth-info.component';
import { VpnConfigComponent } from './vpn-config/vpn-config.component';
import { NetworkServicesComponent } from './service-field/network-services/network-services.component';
import { ConnectivityServicesComponent } from './service-field/connectivity-services/connectivity-services.component';
import { SecurityServicesComponent } from './service-field/security-services/security-services.component';
import { SiteBandwidthChartComponent } from './ngx-charts/site-bandwidth-chart';
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
import { AddCustomerPanelComponent } from './add-customer-panel/add-customer-panel.component';
import { QosSetPanelComponent } from './qos-set-panel/qos-set-panel.component';
import { RemoveSiteComponent } from './remove-site/remove-site.component';
import { NotificationComponent } from '../../components/dashboard/notifications/notification.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerItemComponent } from './customer/customer-item/customer-item.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CreateInternetAccessComponent } from './internet/create-internet-access.component';
import { InfoComponent } from './info/info.component';
import { AddServicePanelComponent } from './add-service-panel/add-service-panel.component';
import { RemoteAccessComponent } from './remote-access/remote-access.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateWifiComponent } from './create-wifi/create-wifi.component';
import { CreateVpnComponent } from './create-vpn/create-vpn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAclComponent } from './create-acl/create-acl.component';
import { AclRuleComponent } from './create-acl/acl-rule/acl-rule.component';
import { CsupportComponent } from './csupport/csupport.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { TreeModule } from 'angular-tree-component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxChartsModule,
    Md2Module,
    DatetimePopupModule,
    TreeModule
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    AppLeftSidebarComponent,
    FloatSiteInfoComponent,
    SiteInfoItemComponent,
    SiteInfoPanelComponent,
    CreateSiteComponent,
    SelfProvisionComponent,
    FloatSiteBandwidthInfoComponent,
    VpnConfigComponent,
    NetworkServicesComponent,
    ConnectivityServicesComponent,
    SecurityServicesComponent,
    FloatSiteBandwidthInfoComponent,
    SiteBandwidthChartComponent,
    AddCustomerPanelComponent,
    QosSetPanelComponent,
    RemoveSiteComponent,
    NotificationComponent,
    UserProfileComponent,
    CustomerComponent,
    CustomerItemComponent,
    AutocompleteComponent,
    CustomerListComponent,
    CreateInternetAccessComponent,
    InfoComponent,
    AddServicePanelComponent,
    CreateInternetAccessComponent,
    RemoteAccessComponent,
    FeedbackComponent,
    CreateWifiComponent,
    CreateVpnComponent,
    CreateAclComponent,
    AclRuleComponent,
    CsupportComponent,
    SupportPageComponent,
    ContactsComponent
  ],
  providers: [],
  exports: [
    DashboardComponent,
    NotificationComponent,
    CreateInternetAccessComponent,
    CreateVpnComponent
  ]

})
export class DashboardModule { }
