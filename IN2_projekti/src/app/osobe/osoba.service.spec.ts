import { TestBed, inject } from '@angular/core/testing';

import { OsobaService } from './osoba.service';

describe('OsobaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OsobaService]
    });
  });

  it('should be created', inject([OsobaService], (service: OsobaService) => {
    expect(service).toBeTruthy();
  }));
});
