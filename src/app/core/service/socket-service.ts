import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket!: Socket;
// Replace with your backend server URL
  private readonly SOCKET_URL = 'http://localhost:3000'; 
connect() {
    this.socket = io(this.SOCKET_URL);
    console.log('Connected to Socket.IO server');
  }
disconnect() {
    if (this.socket) this.socket.disconnect();
  }
// Emit an event
  sendMessage(event: string, data: any) {
    this.socket.emit(event, data);
  }
// Listen for an event
  listen(event: string) {
    return new Observable<any>((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

}
