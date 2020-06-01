import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCreatedComponent } from './pages-created.component';

describe('PagesCreatedComponent', () => {
  let component: PagesCreatedComponent;
  let fixture: ComponentFixture<PagesCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
