import { TestBed, inject } from '@angular/core/testing';

import { ProjektiService } from './projekti.service';

describe('ProjektiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjektiService]
    });
  });

  it('should be created', inject([ProjektiService], (service: ProjektiService) => {
    expect(service).toBeTruthy();
  }));
});
