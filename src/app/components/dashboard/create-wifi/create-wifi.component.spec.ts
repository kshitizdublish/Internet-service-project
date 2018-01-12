import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWifiComponent } from './create-wifi.component';

describe('CreateWifiComponent', () => {
  let component: CreateWifiComponent;
  let fixture: ComponentFixture<CreateWifiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWifiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
