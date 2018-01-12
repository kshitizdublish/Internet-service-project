import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnConfigComponent } from './vpn-config.component';

describe('VpnConfigComponent', () => {
  let component: VpnConfigComponent;
  let fixture: ComponentFixture<VpnConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VpnConfigComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
