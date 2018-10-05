import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazeComponent } from './faze.component';

describe('FazeComponent', () => {
  let component: FazeComponent;
  let fixture: ComponentFixture<FazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
