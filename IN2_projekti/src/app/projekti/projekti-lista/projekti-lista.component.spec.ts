import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektiListaComponent } from './projekti-lista.component';

describe('ProjektiListaComponent', () => {
  let component: ProjektiListaComponent;
  let fixture: ComponentFixture<ProjektiListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektiListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektiListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
