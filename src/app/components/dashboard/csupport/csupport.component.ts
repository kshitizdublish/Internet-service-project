import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CustomEvents } from '../../../events/customevents';
import { GetAllSitesService } from '../../../services/getAllSites/getAllSites.service';
import { SiteLocation } from '../../../vo/locations/sites-location';
import { SiteInfo } from '../../../vo/sites-info/site-info';
import { AppConfigs } from '../../../common/app.config';
import { Subscribable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-csupport',
  templateUrl: './csupport.component.html',
  styleUrls: ['./csupport.component.scss']
})
export class CsupportComponent implements OnInit {
  constructor(
		private _customEvents: CustomEvents,
    private translate: TranslateService
  ) {}

  ngOnInit() {
  }

}
