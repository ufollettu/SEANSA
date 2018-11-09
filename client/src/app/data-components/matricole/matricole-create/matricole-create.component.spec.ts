import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricoleCreateComponent } from './matricole-create.component';

describe('MatricoleCreateComponent', () => {
  let component: MatricoleCreateComponent;
  let fixture: ComponentFixture<MatricoleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricoleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
