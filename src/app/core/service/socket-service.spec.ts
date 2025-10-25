// import { TestBed } from '@angular/core/testing';
// import * as socketIoClient from 'socket.io-client';
// import { Observable } from 'rxjs';
// import { SocketService } from './socket-service';

// // Create a mock socket object
// const mockSocket: any = {
//   on: jasmine.createSpy('on'),
//   emit: jasmine.createSpy('emit'),
//   disconnect: jasmine.createSpy('disconnect'),
// };

// // Spy on io() to return the mock socket
// spyOn(socketIoClient, 'io').and.returnValue(mockSocket);

// describe('SocketService', () => {
//   let service: SocketService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(SocketService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should connect to socket server', () => {
//     service.connect();
//     expect(mockSocket).toBeDefined();
//   });

//   it('should disconnect socket', () => {
//     service.connect();
//     service.disconnect();
//     expect(mockSocket.disconnect).toHaveBeenCalled();
//   });

//   it('should emit events', () => {
//     service.connect();
//     service.sendMessage('message', 'Hello');
//     expect(mockSocket.emit).toHaveBeenCalledWith('message', 'Hello');
//   });

//   it('should listen for events and receive data', (done: DoneFn) => {
//     // Use callFake on the spy
//     mockSocket.on.and.callFake((_event: string, callback: Function) => {
//       callback('test-data');
//     });

//     service.connect();
//     service.listen('message').subscribe((data) => {
//       expect(data).toBe('test-data');
//       done();
//     });
//   });
// });
