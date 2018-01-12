import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSiteComponent } from './remove-site.component';

describe('RemoveSiteComponent', () => {
  let component: RemoveSiteComponent;
  let fixture: ComponentFixture<RemoveSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
