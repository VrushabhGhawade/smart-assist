import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';
import { AuthResponse, User } from '../model/auth';
import { UserRole } from '../constant/auth-enum';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://af601onlinesuppportsystemdev.azurewebsites.net/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct baseUrl', () => {
    expect(service.baseUrl).toBe(baseUrl);
  });

  describe('login', () => {
    it('should send login request with correct headers and endpoint', () => {
      const username = 'test@example.com';
      const password = 'password123';
      const mockResponse: AuthResponse = {
        userToken: 'mock-token-123',
        correlationId: 'corr-id-123'
      };

      service.login(username, password).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.userToken).toBe('mock-token-123');
      });

      const req = httpMock.expectOne(`${baseUrl}/user/authenticate`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('EntityController')).toBe('1');
      expect(req.request.headers.get('EmailId')).toBe(username);
      expect(req.request.headers.get('Password')).toBe(password);
      
      req.flush(mockResponse);
    });

    it('should handle login success', () => {
      const username = 'user@test.com';
      const password = 'pass123';
      const mockToken: AuthResponse = {
        userToken: 'success-token',
        correlationId: 'corr-id-456'
      };

      service.login(username, password).subscribe(response => {
        expect(response).toEqual(mockToken);
        expect(response.userToken).toBe('success-token');
      });

      const req = httpMock.expectOne(`${baseUrl}/user/authenticate`);
      req.flush(mockToken);
    });

    it('should handle login failure with error', () => {
      const username = 'wrong@test.com';
      const password = 'wrongpass';
      const errorMessage = 'Invalid credentials';

      service.login(username, password).subscribe({
        next: () => fail('should have failed with 401 error'),
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.error).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/user/authenticate`);
      req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
    });

    it('should handle network error', () => {
      const username = 'user@test.com';
      const password = 'pass123';

      service.login(username, password).subscribe({
        next: () => fail('should have failed with network error'),
        error: (error) => {
          expect(error.error.type).toBe('error');
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/user/authenticate`);
      req.error(new ProgressEvent('error'));
    });
  });

  describe('validateToken', () => {
    it('should send validate token request to correct endpoint', () => {
      const mockUser: User = {
        userId: '123',
        entityControllerId: 1,
        email: 'test@example.com',
        niTOPLUSRole: 1,
        userRole: UserRole.Student,
        firstName: 'Test',
        lastName: 'User',
        countryCode: '+1',
        phoneNumber: '1234567890',
        photo: 'photo.jpg'
      };

      service.validateToken().subscribe(response => {
        expect(response).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${baseUrl}/user/validate`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should handle valid token with student role', () => {
      const mockUser: User = {
        userId: '456',
        entityControllerId: 1,
        email: 'student@test.com',
        niTOPLUSRole: 1,
        userRole: UserRole.Student,
        firstName: 'Student',
        lastName: 'Test',
        countryCode: '+1',
        phoneNumber: '9876543210',
        photo: 'student.jpg'
      };

      service.validateToken().subscribe(user => {
        expect(user.userRole).toBe(UserRole.Student);
        expect(user.userId).toBe('456');
        expect(user.email).toBe('student@test.com');
        expect(user.firstName).toBe('Student');
      });

      const req = httpMock.expectOne(`${baseUrl}/user/validate`);
      req.flush(mockUser);
    });

    it('should handle token validation failure', () => {
      const errorMessage = 'Invalid token';

      service.validateToken().subscribe({
        next: () => fail('should have failed with 403 error'),
        error: (error) => {
          expect(error.status).toBe(403);
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/user/validate`);
      req.flush(errorMessage, { status: 403, statusText: 'Forbidden' });
    });

    it('should handle server error during validation', () => {
      service.validateToken().subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/user/validate`);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
