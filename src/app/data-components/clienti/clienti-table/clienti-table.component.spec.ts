import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientiTableComponent } from './clienti-table.component';

describe('ClientiTableComponent', () => {
  let component: ClientiTableComponent;
  let fixture: ComponentFixture<ClientiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
