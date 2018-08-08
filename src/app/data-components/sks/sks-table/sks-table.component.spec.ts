import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SksTableComponent } from './sks-table.component';

describe('SksTableComponent', () => {
  let component: SksTableComponent;
  let fixture: ComponentFixture<SksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
