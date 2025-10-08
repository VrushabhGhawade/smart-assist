import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTicket, Ticket } from '../../component/feature/enduser/model/create-ticket';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  // baseUrl = 'https://nitoplusapimanagement.azure-api.net/AF601OnlineSuppportSystemDev';
  baseUrl ='https://af601onlinesuppportsystemdev.azurewebsites.net/api';
  constructor(private http: HttpClient) { }
  createTicket(request: CreateTicket): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ticket`, request);
  }
  getAllTicketTicketByUserId(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/ticket/${userId}`);
  }
  trackTicket(ticketId: string,userId:string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/ticket/${ticketId}/user/${userId}`);
  }
}
