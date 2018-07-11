import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiTableComponent } from './utenti-table.component';

describe('UtentiTableComponent', () => {
  let component: UtentiTableComponent;
  let fixture: ComponentFixture<UtentiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtentiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtentiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
