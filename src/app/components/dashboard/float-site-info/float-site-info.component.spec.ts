import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatSiteInfoComponent } from './float-site-info.component';

describe('FloatSiteInfoComponent', () => {
  let component: FloatSiteInfoComponent;
  let fixture: ComponentFixture<FloatSiteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatSiteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatSiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
