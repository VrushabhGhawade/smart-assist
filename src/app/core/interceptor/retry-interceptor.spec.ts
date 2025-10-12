import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { throwError } from 'rxjs';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: Router, useValue: router },
      ]
    });
  });

  it('should handle 401 error and clear localStorage', (done) => {
    localStorage.setItem('dummy', 'value');

    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 401 });

    const next = jasmine.createSpy('next').and.returnValue(
      throwError(() => errorResponse)
    );

    errorInterceptor(req, next).subscribe({
      error: () => {
        // 401 logic covered
        expect(snackBar.open).toHaveBeenCalledWith(
          'You are not authorized. Please login again.',
          'Close',
          jasmine.any(Object)
        );
        expect(localStorage.getItem('dummy')).toBeNull(); // cleared
        done();
      }
    });
  });

  it('should handle other errors and show message', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: { message: 'Server error occurred' }
    });

    const next = jasmine.createSpy('next').and.returnValue(
      throwError(() => errorResponse)
    );

    errorInterceptor(req, next).subscribe({
      error: () => {
        // non-401 logic covered
        expect(snackBar.open).toHaveBeenCalledWith(
          'Server error occurred',
          'Close',
          jasmine.any(Object)
        );
        done();
      }
    });
  });
});
