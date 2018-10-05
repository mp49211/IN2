import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaUlogaComponent } from './nova-uloga.component';

describe('NovaUlogaComponent', () => {
  let component: NovaUlogaComponent;
  let fixture: ComponentFixture<NovaUlogaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaUlogaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaUlogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
