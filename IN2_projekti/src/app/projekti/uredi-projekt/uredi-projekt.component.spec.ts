import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediProjektComponent } from './uredi-projekt.component';

describe('UrediProjektComponent', () => {
  let component: UrediProjektComponent;
  let fixture: ComponentFixture<UrediProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
