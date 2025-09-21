import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
   constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ success: boolean }> {
    // Replace with your real API call:
    // return this.http.post<{ success: boolean }>('/api/login', { username, password });

    // Demo: simulate API call with delay
    console.log('API CAll');
    return of({ success: username === 'enduser' && password === '123' }).pipe(delay(2000));
  }
}
