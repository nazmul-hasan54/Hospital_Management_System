import { TestBed } from '@angular/core/testing';

import { PatienttestService } from './patienttest.service';

describe('PatienttestService', () => {
  let service: PatienttestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatienttestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
