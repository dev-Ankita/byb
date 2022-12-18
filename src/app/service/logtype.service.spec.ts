import { TestBed } from '@angular/core/testing';

import { LogtypeService } from './logtype.service';

describe('LogtypeService', () => {
  let service: LogtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
