import { TestBed } from '@angular/core/testing';

import { MedicinelistsService } from './medicinelists.service';

describe('MedicinelistsService', () => {
  let service: MedicinelistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicinelistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
