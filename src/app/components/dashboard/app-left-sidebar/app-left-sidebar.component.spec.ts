import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLeftSidebarComponent } from './app-left-sidebar.component';

describe('AppLeftSidebarComponent', () => {
  let component: AppLeftSidebarComponent;
  let fixture: ComponentFixture<AppLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLeftSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
