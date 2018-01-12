import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerItemComponent implements OnInit {

  @Input() customerName = '';
  @Input() tenantName = '';
  @Input() logoPath = '';

  constructor() { }

  ngOnInit() {
  }

}
