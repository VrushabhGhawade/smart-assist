import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar); 
  const router = inject(Router); 

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = '';
      if (error.status === 401) {
        message = 'You are not authorized. Please login again.';
        localStorage.clear();
        router.navigate(['/login']); 
      } else {
        message = error.error?.message || `Error ${error.status}: ${error.error}`;
      }

      // Show error snackbar
      snackBar.open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      return throwError(() => error);
    })
  );
};
