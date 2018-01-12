import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerPanelComponent } from './add-customer-panel.component';

describe('AddCustomerPanelComponent', () => {
  let component: AddCustomerPanelComponent;
  let fixture: ComponentFixture<AddCustomerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
