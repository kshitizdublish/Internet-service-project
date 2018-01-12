import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { TranslateService, TranslateDirective } from 'ng2-translate';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoComponent implements OnInit {

  @Input() markerObj = {
    name: '',
    wanAccessType: '',
    area: '',
    location: '',
    csrType: ''
  };

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
  }

}
