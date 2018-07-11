import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RinnoviCreateComponent } from './rinnovi-create.component';

describe('RinnoviCreateComponent', () => {
  let component: RinnoviCreateComponent;
  let fixture: ComponentFixture<RinnoviCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RinnoviCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RinnoviCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
