import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcEditComponent } from './pc-edit.component';

describe('PcEditComponent', () => {
  let component: PcEditComponent;
  let fixture: ComponentFixture<PcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
