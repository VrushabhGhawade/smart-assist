import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constant/local-session-enum';
import { AuthResponse, User } from '../model/auth';
import { Router } from '@angular/router';
import { DataEncryptDecryptService } from './data-encrypt-decrypt-service';

@Injectable({
  providedIn: 'root'
})
export class PersistentAuthService {
  constructor(private router: Router,private dataEncryptDecryptService:DataEncryptDecryptService) {

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
      const userData:User={
        entityControllerId: response.entityControllerId,
        email: this.dataEncryptDecryptService.encrypt(response.email),
        niTOPLUSRole: response.niTOPLUSRole,
        userRole: response.userRole,
        firstName: this.dataEncryptDecryptService.encrypt(response.firstName),
        lastName: this.dataEncryptDecryptService.encrypt(response.lastName),
        countryCode: response.countryCode,
        phoneNumber: this.dataEncryptDecryptService.encrypt(response.phoneNumber),
        photo: this.dataEncryptDecryptService.encrypt(response.photo),
        userId: this.dataEncryptDecryptService.encrypt(response.userId)
      };
      localStorage.setItem(LocalStorageKeys.LOCAL_USER_DATA, JSON.stringify(userData));
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
