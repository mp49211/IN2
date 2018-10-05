import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TehnologijeComponent } from './tehnologije.component';

describe('TehnologijeComponent', () => {
  let component: TehnologijeComponent;
  let fixture: ComponentFixture<TehnologijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TehnologijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TehnologijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
