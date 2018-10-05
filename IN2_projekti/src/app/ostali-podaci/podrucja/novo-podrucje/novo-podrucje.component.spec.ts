import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPodrucjeComponent } from './novo-podrucje.component';

describe('NovoPodrucjeComponent', () => {
  let component: NovoPodrucjeComponent;
  let fixture: ComponentFixture<NovoPodrucjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoPodrucjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoPodrucjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
