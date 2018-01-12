import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConfigs } from '../../../common/app.config';
import { CustomEvents } from '../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';
import { CreateVpnService } from '../../../services/create-vpn/create-vpn.service';
import { TranslateService } from 'ng2-translate';
import { Http } from '@angular/http';
import { IpvpnItem } from '../../../vo/ipvpn/IpvpnItem';

import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataObjectUtils } from '../../../utils/DataObjectUtils';
import { SiteLocation } from '../../../vo/locations/sites-location';

@Component({
  selector: 'app-create-vpn',
  templateUrl: './create-vpn.component.html',
  styleUrls: ['./create-vpn.component.scss']
})
export class CreateVpnComponent implements OnInit, OnDestroy {
  createVpnForm: FormGroup;
  getAllSitesNameSub: Subscription;
  configVPNSub: Subscription;
  radioTest: FormGroup;
  createSiteErrorMsg = '';

  fullmesh = true;
  hubspoke = false;
  sitesNamesFullmesh: Array<any>;

  locationList: Array<any>;
  selectedLocationList: Array<any> = [];
  selectedHubList: Array<any> = [];
  vpnType = 'full_mesh';
  vpnName = '';

  constructor(
      private fb: FormBuilder,
      private _customEvents: CustomEvents,
      private _http: Http,
      private translate: TranslateService,
      private createVpnService: CreateVpnService,
      ) {

    this.createVpnForm = this.fb.group({
          'vpnName' : ['', Validators.required],
          'location': ['', Validators.required],
          'layer' : ['', Validators.required],
          'topology' : ['', Validators.required],
          'vpnDesc' : ['', Validators.required]
      });
    }

   ngOnInit() {
      this.configVPNSub = this._customEvents.configVPN.subscribe((value: any) => {
        this.completeReset();
      });
      this.getAllSitesNameSub = this._customEvents.getAllSitesNameEvt.subscribe((value: any) => {
           this.getSitesName(AppConfigs.siteLocations);
      });
   }

   selectTopology( type: any) {
     this.vpnType = type;

     this.reset();
     this.hubspoke = (type === 'hub_spoke') ? true : false;
  }

  getSitesName(data: Array<SiteLocation>) {
      this.locationList = [];
      for (let i = 0; i < data.length; i++) {
        if ( String(data[i].runningStatus).toLowerCase() === 'online' ) {
          const _ipvpnItems = new IpvpnItem();
          _ipvpnItems.id = String( data[i].id );
          _ipvpnItems.name = String( data[i].name );
          _ipvpnItems.action = String( 'create' );
          _ipvpnItems.location = String( data[i].location );
          this.locationList.push(_ipvpnItems);
        }
      }
	  }

   onSelectSiteItem(item: IpvpnItem, chkBox) {
    item.selected = chkBox.checked;
     if (!chkBox.checked) {
       const index = this.selectedLocationList.findIndex(x => x.id === item.id);
       this.selectedLocationList.splice(index, 1);
     } else {
      item.radioSelected = false;
       this.selectedLocationList.push(item);
     }

     if (this.selectedLocationList.length === 0) {
      this.selectedHubList = [];
     }
   }

   onSelectRadioitem(item, radioBox) {
     for (let i = 0; i < this.selectedLocationList.length; i++) {
       if (item.id === this.selectedLocationList[i].id) {
        this.selectedLocationList[i].radioSelected = true;
        this.selectedLocationList[i].topologyRole = 'hub';
       } else {
        this.selectedLocationList[i].radioSelected = false;
        this.selectedLocationList[i].topologyRole = 'spoke';
       }
     }
     this.selectedHubList = [];

     if (!radioBox) {
      const index = this.selectedLocationList.findIndex(x => x.id === item.id);
      this.selectedHubList.splice(index, 1);
     } else {
       this.selectedHubList.push(item);
     }
   }

   generateSiteInfo( list: any) {
     const arr: Array<any> = [];
     list.forEach( (ele: IpvpnItem) => {
       if (ele.selected) {
        const addObj = { id: ele.id, topologyRole: ele.topologyRole, action: ele.action };
        arr.push(addObj);
       }
     });
     return arr;
   }

    submitCreateVpnForm(values: any, evt: any) {
      this.createSiteErrorMsg = '';
      if (this.vpnName === '') {
          this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
            this.createSiteErrorMsg = res;
          });
          return;
      }
      this.vpnName = String(this.vpnName).trim();
      if (DataObjectUtils.stripWhiteSpace( {val: this.vpnName } )) {
        this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
          this.createSiteErrorMsg = res;
        });
        return;
      }

      if (this.selectedLocationList.length === 0) {
        this.translate.get('CreateVpnPanel.error.fullMesh').subscribe((res: string) => {
          this.createSiteErrorMsg = res;
        });
        return;
      }

      if ( this.hubspoke ) {
        if (this.selectedHubList.length === 0 ) {
          this.translate.get('CreateVpnPanel.error.hubAndSpoke').subscribe((res: string) => {
            this.createSiteErrorMsg = res;
          });
          return;
        }
      }

      const formObj: any = {};
      formObj.topology = this.vpnType;
      formObj.vpnName = this.vpnName;
      formObj.siteinfoList = this.generateSiteInfo( this.selectedLocationList );

      let alertHeading = '';
      this.translate.get('Success.heading').subscribe((res: string) => {
        alertHeading = res;
      });
      let bodyText = '';
      this.translate.get('CreateVpnPanel.success').subscribe((res: string) => {
        bodyText = res;
      });
      this._customEvents.showAlertModalEvt.emit({
        show: true,
        heading: alertHeading,
        bodyText: bodyText
      });

      this._customEvents.showHideLoader.emit({ show: true });
      this.createVpnService.requestCreateVpn(formObj).subscribe((response: any) => {
        this.completeReset();
        this.onHTTPRequestComplete();
      }, (error: any) => {
        this.completeReset();
        this.onHTTPRequestComplete();
        AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'requestCreateVpn');
      });
    }

    closeVPNForm() {
      this._customEvents.createNewVpnEvt.emit( {show: false} );
    }
    reset() {
      this.getSitesName(AppConfigs.siteLocations);
      this.selectedLocationList = [];
      this.selectedHubList = [];
    }

    completeReset() {
      this.getSitesName(AppConfigs.siteLocations);
      this.selectedLocationList = [];
      this.selectedHubList = [];
      this.vpnName = '';
      this.fullmesh = true;
    }

    onHTTPRequestComplete() {
      this.closeVPNForm();

      this._customEvents.showHideOverlayMap.emit({ show: false });
      this._customEvents.showHideServicePanel.emit({ show: false });
      this._customEvents.showHideLoader.emit({ show: false });
    }

    ngOnDestroy() {
      if (this.getAllSitesNameSub) {
        this.getAllSitesNameSub.unsubscribe();
      }
      if (this.configVPNSub) {
        this.configVPNSub.unsubscribe();
      }
    }
}
