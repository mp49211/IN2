import { TestBed, async, inject } from '@angular/core/testing';

import { ProjektDetaljiGuard } from './projekt-detalji.guard';

describe('ProjektDetaljiGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjektDetaljiGuard]
    });
  });

  it('should ...', inject([ProjektDetaljiGuard], (guard: ProjektDetaljiGuard) => {
    expect(guard).toBeTruthy();
  }));
});
