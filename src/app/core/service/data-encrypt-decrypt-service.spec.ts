import { TestBed } from '@angular/core/testing';
import * as CryptoJS from 'crypto-js';
import { DataEncryptDecryptService } from './data-encrypt-decrypt-service';

describe('DataEncryptDecryptService', () => {
  let service: DataEncryptDecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataEncryptDecryptService]
    });
    service = TestBed.inject(DataEncryptDecryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt the plaintext correctly', () => {
    const plaintext = 'HelloWorld';
    const encrypted = service.encrypt(plaintext);

    expect(encrypted).toBeTruthy();
    expect(typeof encrypted).toBe('string');
    expect(encrypted).not.toBe(plaintext); // encrypted value should differ
  });

  it('should decrypt the ciphertext correctly', () => {
    const plaintext = 'AngularRocks!';
    const encrypted = service.encrypt(plaintext);
    const decrypted = service.decrypt(encrypted);

    expect(decrypted).toBe(plaintext);
  });

  it('should return empty string for invalid ciphertext', () => {
    const decrypted = service.decrypt('invalidCipherText');
    expect(decrypted).toBe(''); // CryptoJS returns empty string when invalid
  });

  it('should use the correct secret key', () => {
    expect(service.secretKey).toBe('Abcd');
  });
});
