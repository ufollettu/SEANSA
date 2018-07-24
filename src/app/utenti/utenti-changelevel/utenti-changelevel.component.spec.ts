import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiChangelevelComponent } from './utenti-changelevel.component';

describe('UtentiChangelevelComponent', () => {
  let component: UtentiChangelevelComponent;
  let fixture: ComponentFixture<UtentiChangelevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtentiChangelevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtentiChangelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
