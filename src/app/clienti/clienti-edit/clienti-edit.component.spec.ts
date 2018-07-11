import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientiEditComponent } from './clienti-edit.component';

describe('ClientiEditComponent', () => {
  let component: ClientiEditComponent;
  let fixture: ComponentFixture<ClientiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
