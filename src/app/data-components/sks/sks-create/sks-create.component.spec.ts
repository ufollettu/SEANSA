import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SksCreateComponent } from './sks-create.component';

describe('SksCreateComponent', () => {
  let component: SksCreateComponent;
  let fixture: ComponentFixture<SksCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SksCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
