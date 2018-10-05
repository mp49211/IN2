import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediUloguComponent } from './uredi-ulogu.component';

describe('UrediUloguComponent', () => {
  let component: UrediUloguComponent;
  let fixture: ComponentFixture<UrediUloguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediUloguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediUloguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
