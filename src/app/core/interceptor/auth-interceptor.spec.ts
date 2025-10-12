import { LocalStorageKeys } from '../constant/local-session-enum';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  let next: jasmine.Spy;

  beforeEach(() => {
    localStorage.clear();
    next = jasmine.createSpy('next').and.returnValue(of({} as HttpEvent<any>));
  });

  it('should add headers if token and correlationId exist', (done) => {
    const token = 'test-token';
    const correlationId = 'corr-id-123';
    localStorage.setItem(LocalStorageKeys.LOCAL_USER_TOKEN, token);
    localStorage.setItem(LocalStorageKeys.lOCAL_CORRELATION_ID, correlationId);

    const request = new HttpRequest('GET', '/test');

    authInterceptor(request, next).subscribe(() => {
      const clonedRequest = next.calls.mostRecent().args[0] as HttpRequest<any>;
      expect(clonedRequest.headers.get('UserToken')).toBe(token);
      expect(clonedRequest.headers.get('CorrelationId')).toBe(correlationId);
      done();
    });
  });

  it('should not add headers if token or correlationId are missing', (done) => {
    const request = new HttpRequest('GET', '/test');

    authInterceptor(request, next).subscribe(() => {
      const clonedRequest = next.calls.mostRecent().args[0] as HttpRequest<any>;
      expect(clonedRequest.headers.has('UserToken')).toBeFalse();
      expect(clonedRequest.headers.has('CorrelationId')).toBeFalse();
      done();
    });
  });
});
