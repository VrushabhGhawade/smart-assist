import { TestBed } from '@angular/core/testing';

import { DataEncryptDecryptService } from './data-encrypt-decrypt-service';

describe('DataEncryptDecryptService', () => {
  let service: DataEncryptDecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEncryptDecryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});