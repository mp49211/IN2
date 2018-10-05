import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaOsobaComponent } from './nova-osoba.component';

describe('NovaOsobaComponent', () => {
  let component: NovaOsobaComponent;
  let fixture: ComponentFixture<NovaOsobaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaOsobaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaOsobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
