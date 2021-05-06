import { TestBed } from '@angular/core/testing';

import { ScienceWorkService } from './science-work.service';

describe('ScienceWorkService', () => {
  let service: ScienceWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScienceWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
