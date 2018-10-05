import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlogeComponent } from './uloge.component';

describe('UlogeComponent', () => {
  let component: UlogeComponent;
  let fixture: ComponentFixture<UlogeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlogeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
