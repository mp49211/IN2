import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediStackComponent } from './uredi-stack.component';

describe('UrediStackComponent', () => {
  let component: UrediStackComponent;
  let fixture: ComponentFixture<UrediStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
