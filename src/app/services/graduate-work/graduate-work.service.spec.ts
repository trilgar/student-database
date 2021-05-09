import { TestBed } from '@angular/core/testing';

import { GraduateWorkService } from './graduate-work.service';

describe('GraduateWorkService', () => {
  let service: GraduateWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduateWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
