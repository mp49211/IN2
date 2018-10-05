import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediPodrucjeComponent } from './uredi-podrucje.component';

describe('UrediPodrucjeComponent', () => {
  let component: UrediPodrucjeComponent;
  let fixture: ComponentFixture<UrediPodrucjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediPodrucjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediPodrucjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
