import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaTehnologijaComponent } from './nova-tehnologija.component';

describe('NovaTehnologijaComponent', () => {
  let component: NovaTehnologijaComponent;
  let fixture: ComponentFixture<NovaTehnologijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaTehnologijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaTehnologijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
