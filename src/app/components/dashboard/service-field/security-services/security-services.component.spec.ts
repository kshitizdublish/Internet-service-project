import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityServicesComponent } from './security-services.component';

describe('SecurityServicesComponent', () => {
  let component: SecurityServicesComponent;
  let fixture: ComponentFixture<SecurityServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
