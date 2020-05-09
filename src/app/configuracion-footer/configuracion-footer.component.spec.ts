import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionFooterComponent } from './configuracion-footer.component';

describe('ConfiguracionFooterComponent', () => {
  let component: ConfiguracionFooterComponent;
  let fixture: ComponentFixture<ConfiguracionFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
