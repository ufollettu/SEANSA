import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SksEditComponent } from './sks-edit.component';

describe('SksEditComponent', () => {
  let component: SksEditComponent;
  let fixture: ComponentFixture<SksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
