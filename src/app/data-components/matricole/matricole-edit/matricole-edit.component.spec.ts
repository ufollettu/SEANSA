import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricoleEditComponent } from './matricole-edit.component';

describe('MatricoleEditComponent', () => {
  let component: MatricoleEditComponent;
  let fixture: ComponentFixture<MatricoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricoleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
