import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosSetPanelComponent } from './qos-set-panel.component';

describe('QosSetPanelComponent', () => {
  let component: QosSetPanelComponent;
  let fixture: ComponentFixture<QosSetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosSetPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosSetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
