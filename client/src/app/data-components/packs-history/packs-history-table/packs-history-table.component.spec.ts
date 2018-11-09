import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksHistoryTableComponent } from './packs-history-table.component';

describe('PacksHistoryTableComponent', () => {
  let component: PacksHistoryTableComponent;
  let fixture: ComponentFixture<PacksHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacksHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
