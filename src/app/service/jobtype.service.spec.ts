import { TestBed } from '@angular/core/testing';

import { JobtypesService} from './jobtype.service';

describe(' JobtypesService', () => {
  let service:  JobtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject( JobtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
