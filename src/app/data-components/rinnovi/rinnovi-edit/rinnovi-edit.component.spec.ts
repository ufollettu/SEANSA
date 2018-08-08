import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RinnoviEditComponent } from './rinnovi-edit.component';

describe('RinnoviEditComponent', () => {
  let component: RinnoviEditComponent;
  let fixture: ComponentFixture<RinnoviEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RinnoviEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RinnoviEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
