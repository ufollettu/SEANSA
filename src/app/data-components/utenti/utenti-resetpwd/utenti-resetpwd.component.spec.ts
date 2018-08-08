import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiResetpwdComponent } from './utenti-resetpwd.component';

describe('UtentiResetpwdComponent', () => {
  let component: UtentiResetpwdComponent;
  let fixture: ComponentFixture<UtentiResetpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtentiResetpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtentiResetpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
