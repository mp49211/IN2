import { TestBed, async, inject } from '@angular/core/testing';

import { UrediProjektGuard } from './uredi-projekt.guard';

describe('UrediProjektGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrediProjektGuard]
    });
  });

  it('should ...', inject([UrediProjektGuard], (guard: UrediProjektGuard) => {
    expect(guard).toBeTruthy();
  }));
});
