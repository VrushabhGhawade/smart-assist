import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://nitoplusapimanagement.azure-api.net/AF601OnlineSuppportSystemDev';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      EntityController: 1,
      EmailId: username,
      Password: password
    });

    return this.http.get<any>(
      `${this.baseUrl}/user/authenticate`,
      { headers }
    );
  }
  validateToken(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/validate`);
  }
}
