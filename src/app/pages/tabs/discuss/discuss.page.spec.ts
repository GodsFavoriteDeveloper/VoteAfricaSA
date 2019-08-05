import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussPage } from './discuss.page';

describe('DiscussPage', () => {
  let component: DiscussPage;
  let fixture: ComponentFixture<DiscussPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
