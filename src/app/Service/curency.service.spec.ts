import { TestBed } from '@angular/core/testing';

import { CurencyService } from './curency.service';

describe('CurencyService', () => {
  let service: CurencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
