import { TestBed, inject } from '@angular/core/testing';

import { RbaService } from './rba.service';

describe('RbaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RbaService]
    });
  });

  it('should be created', inject([RbaService], (service: RbaService) => {
    expect(service).toBeTruthy();
  }));
});
