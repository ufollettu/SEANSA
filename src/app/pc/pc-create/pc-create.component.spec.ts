import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcCreateComponent } from './pc-create.component';

describe('PcCreateComponent', () => {
  let component: PcCreateComponent;
  let fixture: ComponentFixture<PcCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
