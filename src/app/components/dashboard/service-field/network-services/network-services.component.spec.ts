import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkServicesComponent } from './network-services.component';

describe('NetworkServicesComponent', () => {
  let component: NetworkServicesComponent;
  let fixture: ComponentFixture<NetworkServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
