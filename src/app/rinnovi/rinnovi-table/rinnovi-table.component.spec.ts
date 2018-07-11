import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RinnoviTableComponent } from './rinnovi-table.component';

describe('RinnoviTableComponent', () => {
  let component: RinnoviTableComponent;
  let fixture: ComponentFixture<RinnoviTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RinnoviTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RinnoviTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
