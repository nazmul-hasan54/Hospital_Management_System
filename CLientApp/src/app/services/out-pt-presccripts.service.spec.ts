import { TestBed } from '@angular/core/testing';

import { OutPtPresccriptsService } from './out-pt-presccripts.service';

describe('OutPtPresccriptsService', () => {
  let service: OutPtPresccriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutPtPresccriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
