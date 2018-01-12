import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Acl } from '../../../vo/acl/acl';
import { AclRule } from '../../../vo/acl/acl-rule';
import { CustomEvents } from '../../../events/customevents';
import { TranslateService } from 'ng2-translate';
import { DataObjectUtils } from '../../../utils/DataObjectUtils';
import { CreateAclService } from '../../../services/create-acl/create-acl.service';
import { AppConfigs } from '../../../common/app.config';

@Component({
  selector: 'app-create-acl',
  templateUrl: './create-acl.component.html',
  styleUrls: ['./create-acl.component.scss']
})
export class CreateAclComponent implements OnInit {
  private ipvprotocolList: any[];
  @ViewChild('aclRule') aclRule;

  @Input() set aclFormElements(value: any) {
    this._aclFormElements = value;
    this._aclFormElements.rules = this.aclFormData.rules;
  }
  _aclFormElements: any = {};
  public aclFormData: Acl = new Acl();
  private createAclSub: any;
  private showSiteBandwidthSub: any;
  private editAclMode: Boolean = false;
  private aclFormErrorMsg: String = '';
  private actionList: Array<any> = [];
  private siteId: any;
  createSiteErrorMsg = '';

  constructor(
    private _customEvents: CustomEvents,
    private createAclService: CreateAclService,
    private translate: TranslateService
  ) {

  }

  ngOnInit() {
    this.createAclSub = this._customEvents.createAclEvt.subscribe((value: any) => {
      if (value.show === true) {
        this.resetForm();
      }
    });

    this.showSiteBandwidthSub = this._customEvents.showSiteBandwidthEvt.subscribe( (val: any) => {
      this.aclFormData.siteId = val.id;
    });
  }

  /**
   * @param list
   * validate all rules
   * false means one or more value is empty
   */
  validateRules( list: any) {
    let isValid = true;
    for (let i = 0; i < list.length; i++) {
      if ( DataObjectUtils.stripWhiteSpace( list[i] ) ) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  checkDuplicateNumber( list: any) {
  }

  submitForm() {
    this.createSiteErrorMsg = '';
    const aclRules = this.aclRule.getAllData();
    this.aclFormData.rules = aclRules;
    if ( this.aclFormData.name === '' || this.aclFormData.ipProtocol === '' ) {
      this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.createSiteErrorMsg = res;
			});
			return;
    }

    if ( !this.validateRules(aclRules) ) {
      this.translate.get('Commons.validation.mandatory').subscribe((res: string) => {
				this.createSiteErrorMsg = res;
			});
			return;
    }
    this._customEvents.showHideLoader.emit({ show: true });

    // based on flag create/update the site information
    if (!this.editAclMode) {
      // call the create-site API to save the form data
      this.createAclService.requestCreateAcl(this.aclFormData).subscribe((response: any) => {
        this.resetForm();
        this.closeAclForm();
        this._customEvents.getSiteLocationsEvt.emit({});
        this.onHTTPRequestComplete();
        let alertHeading = '';
        this.translate.get('Success.heading').subscribe((res: string) => {
          alertHeading = res;
        });
        let bodyText = '';
        this.translate.get('createAcl.success').subscribe((res: string) => {
          bodyText = res;
        });
        this._customEvents.showAlertModalEvt.emit({
          show: true,
          heading: alertHeading,
          bodyText: bodyText
        });
      }, (error: any) => {
        this.onHTTPRequestComplete();
        this.getErrorMsg(error);
      });
    } else {
      // call the edit site API to update the form data
    }
  }

  onHTTPRequestComplete() {
    this._customEvents.showHideOverlayMap.emit({ show: false });
    this._customEvents.showHideServicePanel.emit({ show: false });
    this._customEvents.createNewSiteEvt.emit({ show: false });
    this._customEvents.showHideLoader.emit({ show: false });
    this._customEvents.createNewVpnEvt.emit({ show: false });
    this._customEvents.showDoubleOverLay.emit( {show: false} );
  }

  getErrorMsg(error) {
    AppConfigs.errorCodeHandler(error.status, this.translate, this._customEvents, 'requestCreateSite');
  }


  resetForm() {
    this.aclFormData.name = '';
    this.aclFormData.ipProtocol = '';
    this.aclFormData.rules = [];
    this.aclFormData.description = '';
    const indexProtocol = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'ipvprotocol');
    this.ipvprotocolList = [];
    this.ipvprotocolList = AppConfigs.dynamicFormElements[indexProtocol].options;
  }

  closeAclForm() {
    this._customEvents.createAclEvt.emit({ show: false });
    this._customEvents.showDoubleOverLay.emit( {show: false} );
  }

}
