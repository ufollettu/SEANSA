import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksTableComponent } from './packs-table.component';

describe('PacksTableComponent', () => {
  let component: PacksTableComponent;
  let fixture: ComponentFixture<PacksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
