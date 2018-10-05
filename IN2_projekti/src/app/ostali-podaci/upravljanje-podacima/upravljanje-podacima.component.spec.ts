import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravljanjePodacimaComponent } from './upravljanje-podacima.component';

describe('UpravljanjePodacimaComponent', () => {
  let component: UpravljanjePodacimaComponent;
  let fixture: ComponentFixture<UpravljanjePodacimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpravljanjePodacimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpravljanjePodacimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
