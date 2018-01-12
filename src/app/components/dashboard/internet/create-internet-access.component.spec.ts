import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInternetAccessComponent } from './create-internet-access.component';

describe('CreateInternetAccessComponent', () => {
  let component: CreateInternetAccessComponent;
  let fixture: ComponentFixture<CreateInternetAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInternetAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInternetAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
