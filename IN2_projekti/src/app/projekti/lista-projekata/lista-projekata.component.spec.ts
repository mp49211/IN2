import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProjekataComponent } from './lista-projekata.component';

describe('ListaProjekataComponent', () => {
  let component: ListaProjekataComponent;
  let fixture: ComponentFixture<ListaProjekataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProjekataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProjekataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
