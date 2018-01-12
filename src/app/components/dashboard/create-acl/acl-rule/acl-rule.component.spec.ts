import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AclRuleComponent } from './acl-rule.component';

describe('AclRuleComponent', () => {
  let component: AclRuleComponent;
  let fixture: ComponentFixture<AclRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AclRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AclRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
