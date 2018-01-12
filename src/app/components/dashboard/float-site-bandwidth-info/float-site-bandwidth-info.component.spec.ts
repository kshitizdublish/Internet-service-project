import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatSiteBandwidthInfoComponent } from './float-site-bandwidth-info.component';

describe('FloatSiteBandwidthInfoComponent', () => {
  let component: FloatSiteBandwidthInfoComponent;
  let fixture: ComponentFixture<FloatSiteBandwidthInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatSiteBandwidthInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatSiteBandwidthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
