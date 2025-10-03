import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageKeys } from '../constant/local-session-enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem(LocalStorageKeys.LOCAL_USER_TOKEN);
  const correlationId = localStorage.getItem(LocalStorageKeys.lOCAL_CORRELATION_ID);

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
