import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoArchivoComponent } from './nuevo-archivo.component';

describe('NuevoArchivoComponent', () => {
  let component: NuevoArchivoComponent;
  let fixture: ComponentFixture<NuevoArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
