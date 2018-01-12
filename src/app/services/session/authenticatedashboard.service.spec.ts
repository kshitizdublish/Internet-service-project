import { TestBed, inject } from '@angular/core/testing';

import { AuthenticateDashboardService } from './authenticatedashboard.service';

describe('AuthenticatedashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateDashboardService]
    });
  });

  it('should be created', inject([AuthenticateDashboardService], (service: AuthenticateDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
