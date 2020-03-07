import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLandingPageComponent } from './body-landing-page.component';

describe('BodyLandingPageComponent', () => {
  let component: BodyLandingPageComponent;
  let fixture: ComponentFixture<BodyLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
