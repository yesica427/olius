import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpaginaComponent } from './crearpagina.component';

describe('CrearpaginaComponent', () => {
  let component: CrearpaginaComponent;
  let fixture: ComponentFixture<CrearpaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
