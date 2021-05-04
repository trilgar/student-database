import { TestBed } from '@angular/core/testing';

import { CathedraService } from './cathedra.service';

describe('CathedraService', () => {
  let service: CathedraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CathedraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
