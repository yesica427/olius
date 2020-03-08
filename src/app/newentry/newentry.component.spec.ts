import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewentryComponent } from './newentry.component';

describe('NewentryComponent', () => {
  let component: NewentryComponent;
  let fixture: ComponentFixture<NewentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
