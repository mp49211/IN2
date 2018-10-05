import { TestBed, async, inject } from '@angular/core/testing';

import { UrediOsobuGuard } from './uredi-osobu.guard';

describe('UrediOsobuGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrediOsobuGuard]
    });
  });

  it('should ...', inject([UrediOsobuGuard], (guard: UrediOsobuGuard) => {
    expect(guard).toBeTruthy();
  }));
});
