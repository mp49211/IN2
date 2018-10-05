import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediTehnologijuComponent } from './uredi-tehnologiju.component';

describe('UrediTehnologijuComponent', () => {
  let component: UrediTehnologijuComponent;
  let fixture: ComponentFixture<UrediTehnologijuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediTehnologijuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediTehnologijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
