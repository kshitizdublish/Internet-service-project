import { TestBed, inject } from '@angular/core/testing';

import { CreateWifiService } from './create-wifi.service';

describe('CreateWifiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateWifiService]
    });
  });

  it('should be created', inject([CreateWifiService], (service: CreateWifiService) => {
    expect(service).toBeTruthy();
  }));
});
