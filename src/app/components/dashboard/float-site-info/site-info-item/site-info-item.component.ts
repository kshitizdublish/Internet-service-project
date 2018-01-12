import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SiteInfoItem } from '../../../../vo/sites-info/site-info-item';
import { CustomEvents } from '../../../../events/customevents';

@Component({
  selector: 'app-site-info-item',
  templateUrl: './site-info-item.component.html',
  styleUrls: ['./site-info-item.component.scss']
})
export class SiteInfoItemComponent implements OnInit {
  @Input() siteInfoItem: SiteInfoItem;
  @Input() lastItem: boolean;
  @Input() firstItem: any;
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor(private _customEvents: CustomEvents) { }

  ngOnInit() {
  }

  getSelected() {
    if (String(this.siteInfoItem.status).toLowerCase() !== 'nostate') {
      this.siteInfoItem.isSelected = true;
      this.selected.emit();
      this._customEvents.filterSiteOnStatusEvt.emit({siteStatus : this.siteInfoItem.status});
    }
  }

}
