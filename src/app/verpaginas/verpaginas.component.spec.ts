import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpaginasComponent } from './verpaginas.component';

describe('VerpaginasComponent', () => {
  let component: VerpaginasComponent;
  let fixture: ComponentFixture<VerpaginasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerpaginasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
