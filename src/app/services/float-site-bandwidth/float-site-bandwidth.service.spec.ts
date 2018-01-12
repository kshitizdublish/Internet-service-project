import { TestBed, inject } from '@angular/core/testing';

import { FloatSiteBandwidthService } from './float-site-bandwidth.service';

describe('FloatSiteBandwidthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloatSiteBandwidthService]
    });
  });

  it('should be created', inject([FloatSiteBandwidthService], (service: FloatSiteBandwidthService) => {
    expect(service).toBeTruthy();
  }));
});
