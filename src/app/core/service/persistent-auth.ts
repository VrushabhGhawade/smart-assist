import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constant/local-session-enum';
import { AuthResponse, User } from '../model/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersistentAuthService {
  constructor(private router: Router) {

  }
  set userToken(response: AuthResponse | null) {
    if (response) {
      localStorage.setItem(LocalStorageKeys.LOCAL_USER_TOKEN, response.userToken);
      localStorage.setItem(LocalStorageKeys.lOCAL_CORRELATION_ID, response.correlationId);
    } else {
      localStorage.removeItem(LocalStorageKeys.LOCAL_USER_TOKEN);
      localStorage.removeItem(LocalStorageKeys.lOCAL_CORRELATION_ID);

    }
  }

  get userDetails(): User | null {
    const data = localStorage.getItem(LocalStorageKeys.LOCAL_USER_DATA);
    return data ? JSON.parse(data) as User : null;
  }

  set userDetails(response: User | null) {
    if (response) {
      localStorage.setItem(LocalStorageKeys.LOCAL_USER_DATA, JSON.stringify(response));
    } else {
      localStorage.removeItem(LocalStorageKeys.LOCAL_USER_DATA);
    }
  }


  get userToken(): AuthResponse | null {
    const data = localStorage.getItem(LocalStorageKeys.LOCAL_USER_DATA);
    return data ? JSON.parse(data) as AuthResponse : null;
  }

  clear(): void {
    localStorage.removeItem(LocalStorageKeys.LOCAL_USER_TOKEN);
    localStorage.removeItem(LocalStorageKeys.lOCAL_CORRELATION_ID);
    this.router.navigate(['/login']);
  }

  // isLoggedIn(): boolean {
  //   return null;
  // }
}
