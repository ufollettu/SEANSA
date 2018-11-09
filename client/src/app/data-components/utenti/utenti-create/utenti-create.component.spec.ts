import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiCreateComponent } from './utenti-create.component';

describe('UtentiCreateComponent', () => {
  let component: UtentiCreateComponent;
  let fixture: ComponentFixture<UtentiCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtentiCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtentiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
