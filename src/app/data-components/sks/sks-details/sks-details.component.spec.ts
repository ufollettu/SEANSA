import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SksDetailsComponent } from './sks-details.component';

describe('SksDetailsComponent', () => {
  let component: SksDetailsComponent;
  let fixture: ComponentFixture<SksDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SksDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
