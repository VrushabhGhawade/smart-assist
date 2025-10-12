import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateTicket, Ticket } from '../../component/feature/enduser/model/create-ticket';
import { PlatformService } from './platform-service';

describe('PlatformService', () => {
  let service: PlatformService;
  let httpMock: HttpTestingController;

  const baseUrl = 'https://af601onlinesuppportsystemdev.azurewebsites.net/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlatformService]
    });

    service = TestBed.inject(PlatformService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ---------- createTicket ----------
  it('should send POST request to create a ticket', () => {
    const mockRequest: CreateTicket = {
      UserId: 'a1b2c3d4-e5f6-7890-ab12-34567890abcd', // GUID
      Title: 'Login Issue',
      Description: 'User unable to log in',
      Status: 1,
      Priority: 1,
      Attachment: undefined
    };

    const mockResponse = { message: 'Ticket created successfully' };

    service.createTicket(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/ticket`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  // ---------- getAllTicketTicketByUserId ----------
  it('should send GET request to get all tickets by user ID (GUID)', () => {
    const userId = '9e49c670-237d-4c51-8e2c-96790b2e26af';

    const mockTickets: Ticket[] = [
      {
        ticketId: 'TKT001',
        userId: userId,
        title: 'Server Down',
        description: 'Production server not responding',
        status: 1,
        priority: 2,
        createdBy: 'Admin',
        assignedToId: 'usr-007',
        assignedToName: 'Tech Support',
        age: 3,
        attachment: null,
        feedbackRating: null,
        feedback: null
      },
      {
        ticketId: 'TKT002',
        userId: userId,
        title: 'UI Bug',
        description: 'Dashboard not loading',
        status: 0,
        priority: 1,
        createdBy: 'Admin',
        assignedToId: null,
        assignedToName: null,
        age: 1,
        attachment: null,
        feedbackRating: null,
        feedback: null
      }
    ];

    service.getAllTicketTicketByUserId(userId).subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0].userId).toBe(userId);
      expect(response).toEqual(mockTickets);
    });

    const req = httpMock.expectOne(`${baseUrl}/ticket/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });

  // ---------- trackTicket ----------
  it('should send GET request to track a ticket by ticketId and userId (GUID)', () => {
    const ticketId = 'TKT123';
    const userId = 'b3d8e6f4-19aa-456a-b89f-ff1fbc9a1e24';

    const mockTickets: Ticket[] = [
      {
        ticketId,
        userId,
        title: 'Email Failure',
        description: 'Emails not being sent to users',
        status: 2,
        priority: 3,
        createdBy: 'SupportBot',
        assignedToId: 'usr-010',
        assignedToName: 'John Doe',
        age: 5,
        attachment: null,
        feedbackRating: 4,
        feedback: 'Resolved quickly'
      }
    ];

    service.trackTicket(ticketId, userId).subscribe(response => {
      expect(response.length).toBe(1);
      expect(response[0].ticketId).toBe(ticketId);
      expect(response[0].userId).toBe(userId);
      expect(response).toEqual(mockTickets);
    });

    const req = httpMock.expectOne(`${baseUrl}/ticket/${ticketId}/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });
});
