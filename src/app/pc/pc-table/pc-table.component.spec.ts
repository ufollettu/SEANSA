import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcTableComponent } from './pc-table.component';

describe('PcTableComponent', () => {
  let component: PcTableComponent;
  let fixture: ComponentFixture<PcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
