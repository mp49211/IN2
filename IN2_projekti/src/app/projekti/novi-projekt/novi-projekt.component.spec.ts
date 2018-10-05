import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviProjektComponent } from './novi-projekt.component';

describe('NoviProjektComponent', () => {
  let component: NoviProjektComponent;
  let fixture: ComponentFixture<NoviProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoviProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
