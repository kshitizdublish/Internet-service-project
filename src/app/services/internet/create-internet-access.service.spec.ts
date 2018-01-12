import { TestBed, inject } from '@angular/core/testing';

import { CreateInternetAccessService } from './create-internet-access.service';

describe('CreateInternetAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateInternetAccessService]
    });
  });

  it('should be created', inject([CreateInternetAccessService], (service: CreateInternetAccessService) => {
    expect(service).toBeTruthy();
  }));
});
