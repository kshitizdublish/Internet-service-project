import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityServicesComponent } from './connectivity-services.component';

describe('ConnectivityServicesComponent', () => {
  let component: ConnectivityServicesComponent;
  let fixture: ComponentFixture<ConnectivityServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectivityServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectivityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
