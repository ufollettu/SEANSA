import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SksRenewComponent } from './sks-renew.component';

describe('SksRenewComponent', () => {
  let component: SksRenewComponent;
  let fixture: ComponentFixture<SksRenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SksRenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SksRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
