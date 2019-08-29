import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPage } from './successful.page';

describe('SuccessfulPage', () => {
  let component: SuccessfulPage;
  let fixture: ComponentFixture<SuccessfulPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
