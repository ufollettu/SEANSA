import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SksMailerComponent } from './sks-mailer.component';

describe('SksMailerComponent', () => {
  let component: SksMailerComponent;
  let fixture: ComponentFixture<SksMailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SksMailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SksMailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
