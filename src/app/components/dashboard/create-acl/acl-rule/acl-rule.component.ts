import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AclRule } from '../../../../vo/acl/acl-rule';
import { AppConfigs } from '../../../../common/app.config';
import { CustomEvents } from '../../../../events/customevents';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-acl-rule',
  templateUrl: './acl-rule.component.html',
  styleUrls: ['./acl-rule.component.scss']
})
export class AclRuleComponent implements OnInit {
  @Input() set aclFormElements(value: any) {
    this._aclFormElements = value;
  }
  _aclFormElements: any = {};
  private aclRuleList: Array<AclRule>;
  private activeAclRule: AclRule;
  private directionList: Array<any>;
  private cidrList: Array<any>;
  private protocolList: Array<any>;
  private errorMsg: String = '';
  private aclRuleForm: any;
  private createAclSub: Subscription;
  private actionList: Array<any> = [];
  activeEle: any;

  getAllData(): any {
    return this.aclRuleList;
  }

  constructor(private _customEvents: CustomEvents) {
    this.aclRuleList = [new AclRule()];
    this.activeAclRule = this.aclRuleList[0];

  }

  ngOnInit() {
    this.createAclSub = this._customEvents.createAclEvt.subscribe((value: any) => {
      if (value.show === true) {
        this.resetForm();
      }
    });
  }

  addAclRule() {
    if (this.isAclRuleValid()) {
      const aclRule: AclRule = new AclRule();
      this.aclRuleList.push(aclRule);
      this.showAclRule(this.aclRuleList.length - 1); // to show recently added rule
    } else {
      // alert('Not filled');
    }
  }
  getActive(i) {
    return i === this.activeEle;
  }

  showAclRule(index: number) {
    if (this.isAclRuleValid()) {
      this.activeAclRule = this.aclRuleList[index];
      this.activeEle = index;
    } else {
      // alert('Not filled');
    }
  }

  resetForm() {

    const indexDirection = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'direction');
    this.directionList = [];
    this.directionList = AppConfigs.dynamicFormElements[indexDirection].options;

    const indexCidr = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'cidrType');
    this.cidrList = [];
    this.cidrList = AppConfigs.dynamicFormElements[indexCidr].options;

    const indexProtocol = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'protocol');
    this.protocolList = [];
    this.protocolList = AppConfigs.dynamicFormElements[indexProtocol].options;

    const indexAction = AppConfigs.dynamicFormElements.findIndex(x => x.name === 'action');
    this.actionList = [];
    this.actionList = AppConfigs.dynamicFormElements[indexAction].options;

  }

  checkForNumberOnly(maxLength: any, limit: any, input: any) {
    const arr = String(input).split('');
    const last = arr[ arr.length - 1 ];
    if ( isNaN( Number(last) ) ) {
      this.activeAclRule.ruleNumber = String(input).substr(0, arr.length - 1);
    }

    if ( input > limit ) {
      this.activeAclRule.ruleNumber = limit;
    }

    if (String(input) === '0' || input === 0) {
      this.activeAclRule.ruleNumber = '';
    }

    if ( parseFloat(input) <= 0) {
      this.activeAclRule.ruleNumber = '';
    }
  }

  checkForRangeNumberOnly(maxLength: any, limit: any, input: any) {
    const arr = String(input).split('');
    const last = arr[ arr.length - 1 ];
    if ( isNaN( Number(last) ) ) {
      this.activeAclRule.portRange = String(input).substr(0, arr.length - 1);
    }

    if (String(input) === '0' || input === 0) {
      this.activeAclRule.portRange = '';
    }

    if ( parseFloat(input) <= 0) {
      this.activeAclRule.portRange = '';
    }
  }

  removeRule(index: number) {
    this.aclRuleList.splice(index, 1);
  }

  isAclRuleValid() {
    // TODO : Add validation to active rule (this.activeAclRule)
    /* ruleNumber: number;
    direction: any;
    cidrBlock: any;
    cidrType: any;
    protocol: any;
    portRange: any;
    action: any; */
  }

}
