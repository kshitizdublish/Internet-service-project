import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsupportComponent } from './csupport.component';

describe('CsupportComponent', () => {
  let component: CsupportComponent;
  let fixture: ComponentFixture<CsupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
