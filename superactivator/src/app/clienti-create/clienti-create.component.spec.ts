import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientiCreateComponent } from './clienti-create.component';

describe('ClientiCreateComponent', () => {
  let component: ClientiCreateComponent;
  let fixture: ComponentFixture<ClientiCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientiCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
