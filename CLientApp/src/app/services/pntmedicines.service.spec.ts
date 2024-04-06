import { TestBed } from '@angular/core/testing';

import { PntmedicinesService } from './pntmedicines.service';

describe('PntmedicinesService', () => {
  let service: PntmedicinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PntmedicinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
