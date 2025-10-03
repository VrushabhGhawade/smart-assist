import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { AuthResponse, User } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://nitoplusapimanagement.azure-api.net/AF601OnlineSuppportSystemDev';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      EntityController: 1,
      EmailId: username,
      Password: password
    });

    return this.http.get<AuthResponse>(
      `${this.baseUrl}/user/authenticate`,
      { headers }
    );
  }
  validateToken(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/validate`);
  }
}
