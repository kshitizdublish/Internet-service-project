import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInfoPanelComponent } from './site-info-panel.component';

describe('IpvpnComponent', () => {
  let component: SiteInfoPanelComponent;
  let fixture: ComponentFixture<SiteInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
