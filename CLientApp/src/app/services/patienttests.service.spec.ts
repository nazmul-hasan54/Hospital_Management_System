import { TestBed } from '@angular/core/testing';

import { PatienttestsService } from './patienttests.service';

describe('PatienttestsService', () => {
  let service: PatienttestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatienttestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
