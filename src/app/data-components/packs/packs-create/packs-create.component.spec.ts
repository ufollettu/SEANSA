import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksCreateComponent } from './packs-create.component';

describe('PacksCreateComponent', () => {
  let component: PacksCreateComponent;
  let fixture: ComponentFixture<PacksCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacksCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
