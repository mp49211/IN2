import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviStackComponent } from './novi-stack.component';

describe('NoviStackComponent', () => {
  let component: NoviStackComponent;
  let fixture: ComponentFixture<NoviStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoviStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
