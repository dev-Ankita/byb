import { TestBed } from '@angular/core/testing';

import { DisableRegistrationGuard } from './disable-registration.guard';

describe('DisableRegistrationGuard', () => {
  let guard: DisableRegistrationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisableRegistrationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
