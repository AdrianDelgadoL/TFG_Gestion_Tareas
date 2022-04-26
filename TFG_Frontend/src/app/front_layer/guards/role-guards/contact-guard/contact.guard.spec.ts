import { TestBed } from '@angular/core/testing';

import { ContactGuard } from './contact.guard';

describe('VerifierGuard', () => {
  let guard: ContactGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContactGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
