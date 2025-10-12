import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { errorInterceptor } from './error-interceptor';

describe('ErrorInterceptor', () => {
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;
  let handler: HttpHandler;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    handler = { handle: jasmine.createSpy('handle') };
  });

  it('should handle 401 error, clear localStorage, and navigate to login', (done) => {
    spyOn(localStorage, 'clear');

    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });

    handler.handle = jasmine.createSpy().and.returnValue(throwError(() => errorResponse));

    // ✅ Run inside Angular injection context
    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, handler.handle).subscribe({
        error: (error) => {
          expect(localStorage.clear).toHaveBeenCalled();
          expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            'You are not authorized. Please login again.',
            'Close',
            jasmine.objectContaining({ duration: 5000 })
          );
          expect(error).toBe(errorResponse);
          done();
        }
      });
    });
  });

  it('should handle other errors', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 500, error: { message: 'Server error' } });

    handler.handle = jasmine.createSpy().and.returnValue(throwError(() => errorResponse));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, handler.handle).subscribe({
        error: (error) => {
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            'Server error',
            'Close',
            jasmine.objectContaining({ duration: 5000 })
          );
          expect(error).toBe(errorResponse);
          done();
        }
      });
    });
  });

  it('should handle errors with no message', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 404, error: 'Not found' });

    handler.handle = jasmine.createSpy().and.returnValue(throwError(() => errorResponse));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, handler.handle).subscribe({
        error: (error) => {
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            'Error 404: Not found',
            'Close',
            jasmine.objectContaining({ duration: 5000 })
          );
          expect(error).toBe(errorResponse);
          done();
        }
      });
    });
  });
});
