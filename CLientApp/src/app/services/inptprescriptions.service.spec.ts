import { TestBed } from '@angular/core/testing';

import { InptprescriptionsService } from './inptprescriptions.service';

describe('InptprescriptionsService', () => {
  let service: InptprescriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InptprescriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
