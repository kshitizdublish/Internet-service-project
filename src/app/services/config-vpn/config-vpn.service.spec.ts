import { TestBed, inject } from '@angular/core/testing';

import { ConfigVpnService } from './config-vpn.service';

describe('ConfigVpnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigVpnService]
    });
  });

  it('should be created', inject([ConfigVpnService], (service: ConfigVpnService) => {
    expect(service).toBeTruthy();
  }));
});
