import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTicket } from '../../component/feature/enduser/model/create-ticket';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  baseUrl = 'https://nitoplusapimanagement.azure-api.net/AF601OnlineSuppportSystemDev';
  constructor(private http: HttpClient) { }
   createTicket(request: CreateTicket): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/ticket`, request);
    }
}
