import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricoleTableComponent } from './matricole-table.component';

describe('MatricoleTableComponent', () => {
  let component: MatricoleTableComponent;
  let fixture: ComponentFixture<MatricoleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricoleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
