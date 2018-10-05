import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektDetaljiComponent } from './projekt-detalji.component';

describe('ProjektDetaljiComponent', () => {
  let component: ProjektDetaljiComponent;
  let fixture: ComponentFixture<ProjektDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
