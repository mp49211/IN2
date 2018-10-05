import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaFazaComponent } from './nova-faza.component';

describe('NovaFazaComponent', () => {
  let component: NovaFazaComponent;
  let fixture: ComponentFixture<NovaFazaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaFazaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaFazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
