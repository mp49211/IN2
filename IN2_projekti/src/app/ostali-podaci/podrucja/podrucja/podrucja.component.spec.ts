import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodrucjaComponent } from './podrucja.component';

describe('PodrucjaComponent', () => {
  let component: PodrucjaComponent;
  let fixture: ComponentFixture<PodrucjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodrucjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodrucjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
