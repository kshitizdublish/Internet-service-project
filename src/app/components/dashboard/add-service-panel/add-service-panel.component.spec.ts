import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicePanelComponent } from './add-service-panel.component';

describe('AddServicePanelComponent', () => {
  let component: AddServicePanelComponent;
  let fixture: ComponentFixture<AddServicePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServicePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
