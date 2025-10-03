import { TestBed } from '@angular/core/testing';

import { PersistentAuthService } from './persistent-auth';

describe('PersistentAuth', () => {
  let service: PersistentAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistentAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
