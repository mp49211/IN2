import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackoviComponent } from './stackovi.component';

describe('StackoviComponent', () => {
  let component: StackoviComponent;
  let fixture: ComponentFixture<StackoviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackoviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
