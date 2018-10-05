import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediOsobuComponent } from './uredi-osobu.component';

describe('UrediOsobuComponent', () => {
  let component: UrediOsobuComponent;
  let fixture: ComponentFixture<UrediOsobuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediOsobuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediOsobuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
