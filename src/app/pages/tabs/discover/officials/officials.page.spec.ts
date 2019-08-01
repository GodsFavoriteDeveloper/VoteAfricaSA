import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialsPage } from './officials.page';

describe('OfficialsPage', () => {
  let component: OfficialsPage;
  let fixture: ComponentFixture<OfficialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
