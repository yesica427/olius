import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrycategoryComponent } from './entrycategory.component';

describe('EntrycategoryComponent', () => {
  let component: EntrycategoryComponent;
  let fixture: ComponentFixture<EntrycategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrycategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
