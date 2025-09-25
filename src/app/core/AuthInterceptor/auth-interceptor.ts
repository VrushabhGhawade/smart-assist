import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('userToken');
  const correlationId = localStorage.getItem('correlationId');

  let authReq = req;

  if (userToken && correlationId) {
    authReq = req.clone({
      setHeaders: {
        UserToken: userToken,
        CorrelationId: correlationId
      }
    });
  }

  return next(authReq);
};
