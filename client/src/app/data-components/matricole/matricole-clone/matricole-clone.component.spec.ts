import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricoleCloneComponent } from './matricole-clone.component';

describe('MatricoleCloneComponent', () => {
  let component: MatricoleCloneComponent;
  let fixture: ComponentFixture<MatricoleCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricoleCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricoleCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
