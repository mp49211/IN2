import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediFazuComponent } from './uredi-fazu.component';

describe('UrediFazuComponent', () => {
  let component: UrediFazuComponent;
  let fixture: ComponentFixture<UrediFazuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediFazuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediFazuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
