import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevotemaComponent } from './nuevotema.component';

describe('NuevotemaComponent', () => {
  let component: NuevotemaComponent;
  let fixture: ComponentFixture<NuevotemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevotemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevotemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
