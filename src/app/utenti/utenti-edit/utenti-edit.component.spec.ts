import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiEditComponent } from './utenti-edit.component';

describe('UtentiEditComponent', () => {
  let component: UtentiEditComponent;
  let fixture: ComponentFixture<UtentiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtentiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtentiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
