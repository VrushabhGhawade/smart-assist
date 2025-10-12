import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DataEncryptDecryptService } from './data-encrypt-decrypt-service';
import { LocalStorageKeys } from '../constant/local-session-enum';
import { AuthResponse, User } from '../model/auth';
import { PersistentAuthService } from './persistent-auth';
import { UserRole } from '../constant/auth-enum';

describe('PersistentAuthService', () => {
  let service: PersistentAuthService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockEncryptDecryptService: jasmine.SpyObj<DataEncryptDecryptService>;

  const mockUser: User = {
    entityControllerId: 1,
    email: 'test@example.com',
    niTOPLUSRole: 2,
    userRole: UserRole.Student,
    firstName: 'John',
    lastName: 'Doe',
    countryCode: '+91',
    phoneNumber: '9876543210',
    photo: 'photo123',
    userId: 'user123'
  };

  const mockAuthResponse: AuthResponse = {
    userToken: 'mockToken',
    correlationId: 'mockCorrelation'
  };

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockEncryptDecryptService = jasmine.createSpyObj('DataEncryptDecryptService', [
      'encrypt',
      'decrypt'
    ]);

    // Default mock return values
    mockEncryptDecryptService.encrypt.and.callFake((v: string) => `enc(${v})`);
    mockEncryptDecryptService.decrypt.and.callFake((v: string) => v.replace('enc(', '').replace(')', ''));

    TestBed.configureTestingModule({
      providers: [
        PersistentAuthService,
        { provide: Router, useValue: mockRouter },
        { provide: DataEncryptDecryptService, useValue: mockEncryptDecryptService }
      ]
    });

    service = TestBed.inject(PersistentAuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token when userToken is set', () => {
    service.userToken = mockAuthResponse;

    expect(localStorage.getItem(LocalStorageKeys.LOCAL_USER_TOKEN)).toBe('mockToken');
    expect(localStorage.getItem(LocalStorageKeys.lOCAL_CORRELATION_ID)).toBe('mockCorrelation');
  });

  it('should remove token when userToken is null', () => {
    localStorage.setItem(LocalStorageKeys.LOCAL_USER_TOKEN, 'abc');
    localStorage.setItem(LocalStorageKeys.lOCAL_CORRELATION_ID, 'xyz');

    service.userToken = null;

    expect(localStorage.getItem(LocalStorageKeys.LOCAL_USER_TOKEN)).toBeNull();
    expect(localStorage.getItem(LocalStorageKeys.lOCAL_CORRELATION_ID)).toBeNull();
  });

  it('should store encrypted user details', () => {
    service.userDetails = mockUser;

    const stored = localStorage.getItem(LocalStorageKeys.LOCAL_USER_DATA);
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.email).toContain('enc(');
    expect(mockEncryptDecryptService.encrypt).toHaveBeenCalledTimes(6);
  });

  it('should remove user details when set to null', () => {
    localStorage.setItem(LocalStorageKeys.LOCAL_USER_DATA, 'test');
    service.userDetails = null;
    expect(localStorage.getItem(LocalStorageKeys.LOCAL_USER_DATA)).toBeNull();
  });

  it('should return decrypted user details', () => {
    const encryptedUser = {
      ...mockUser,
      email: 'enc(test@example.com)',
      firstName: 'enc(John)',
      lastName: 'enc(Doe)',
      phoneNumber: 'enc(9876543210)',
      photo: 'enc(photo123)',
      userId: 'enc(user123)'
    };
    localStorage.setItem(LocalStorageKeys.LOCAL_USER_DATA, JSON.stringify(encryptedUser));

    const result = service.userDetails;

    expect(result).toBeTruthy();
    expect(result!.email).toBe('test@example.com');
    expect(mockEncryptDecryptService.decrypt).toHaveBeenCalled();
  });

  it('should return null if no user details found', () => {
    localStorage.removeItem(LocalStorageKeys.LOCAL_USER_DATA);
    expect(service.userDetails).toBeNull();
  });

  it('should return parsed AuthResponse from userToken getter', () => {
    const data = { userToken: 'abc', correlationId: 'xyz' };
    localStorage.setItem(LocalStorageKeys.LOCAL_USER_DATA, JSON.stringify(data));

    const result = service.userToken;

    expect(result).toEqual(data as AuthResponse);
  });

  it('should return null if userToken data not found', () => {
    localStorage.removeItem(LocalStorageKeys.LOCAL_USER_DATA);
    expect(service.userToken).toBeNull();
  });

  it('should clear localStorage and navigate to /login', () => {
    spyOn(localStorage, 'removeItem');
    service.clear();

    expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKeys.LOCAL_USER_TOKEN);
    expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKeys.lOCAL_CORRELATION_ID);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
