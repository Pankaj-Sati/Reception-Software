import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEntryPage } from './client-entry.page';

describe('ClientEntryPage', () => {
  let component: ClientEntryPage;
  let fixture: ComponentFixture<ClientEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
