import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfProvisionComponent } from './self-provision.component';

describe('SelfProvisionComponent', () => {
  let component: SelfProvisionComponent;
  let fixture: ComponentFixture<SelfProvisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfProvisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
