import { TestBed } from '@angular/core/testing';

import { PhCoreService } from './ph-core.service';

describe('PhCoreService', () => {
  let service: PhCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
