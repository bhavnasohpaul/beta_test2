import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthenticationPage } from './user-authentication.page';

describe('UserAuthenticationPage', () => {
  let component: UserAuthenticationPage;
  let fixture: ComponentFixture<UserAuthenticationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthenticationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
