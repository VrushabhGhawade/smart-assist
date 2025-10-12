import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnduserMyTickets } from './enduser-my-tickets';
import { PlatformService } from '../../../../core/service/platform-service';
import { PersistentAuthService } from '../../../../core/service/persistent-auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Priority, Ticket, TicketStatus } from '../model/create-ticket';

describe('EnduserMyTickets', () => {
  let component: EnduserMyTickets;
  let fixture: ComponentFixture<EnduserMyTickets>;
  let platformService: jasmine.SpyObj<PlatformService>;
  let persistentAuthService: jasmine.SpyObj<PersistentAuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockTickets: Ticket[] = [
    {
      ticketId: 'T1', title: 'Issue A', status: TicketStatus.Open,
      userId: '',
      description: '',
      priority: Priority.High,
      createdBy: '',
      age: 0
    },
    {
      ticketId: 'T2', title: 'Issue B', status: TicketStatus.Closed,
      userId: '',
      description: '',
      priority: Priority.Low,
      createdBy: '',
      age: 0
    },
    {
      ticketId: 'T3', title: 'Issue C', status: TicketStatus.Resolved,
      userId: '',
      description: '',
      priority: Priority.Medium,
      createdBy: '',
      age: 0
    },
  ];

  beforeEach(async () => {
    const platformSpy = jasmine.createSpyObj('PlatformService', ['getAllTicketTicketByUserId']);
    const authSpy = jasmine.createSpyObj('PersistentAuthService', [], {
      userDetails: { userId: 'user1' }
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: PlatformService, useValue: platformSpy },
        { provide: PersistentAuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnduserMyTickets);
    component = fixture.componentInstance;
    platformService = TestBed.inject(PlatformService) as jasmine.SpyObj<PlatformService>;
    persistentAuthService = TestBed.inject(PersistentAuthService) as jasmine.SpyObj<PersistentAuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should fetch tickets on ngOnInit', () => {
    platformService.getAllTicketTicketByUserId.and.returnValue(of(mockTickets));

    component.ngOnInit();

    expect(platformService.getAllTicketTicketByUserId).toHaveBeenCalledWith('user1');
    expect(component.myTickets).toEqual(mockTickets);
    expect(component.filteredTickets).toEqual(mockTickets);
  });

  it('should handle error when fetching tickets', () => {
    const consoleSpy = spyOn(console, 'error');
    platformService.getAllTicketTicketByUserId.and.returnValue(throwError(() => new Error('API error')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Error creating ticket:', jasmine.any(Error));
    expect(component.myTickets).toBeUndefined();
    expect(component.filteredTickets).toEqual([]);
  });

  it('should filter tickets by status', () => {
    component.myTickets = mockTickets;

    component.onStatusChange(TicketStatus.Open);
    expect(component.filteredTickets.length).toBe(1);
    expect(component.filteredTickets[0].status).toBe(TicketStatus.Open);

    
  });

  it('should search tickets by ticketId, title, or status', () => {
    component.myTickets = mockTickets;

    component.searchText = 'issue a';
    component.onSearchChange();
    expect(component.filteredTickets.length).toBe(1);
    expect(component.filteredTickets[0].ticketId).toBe('T1');

    component.searchText = 'closed';
    component.onSearchChange();
    expect(component.filteredTickets.length).toBe(1);
    expect(component.filteredTickets[0].status).toBe(TicketStatus.Closed);

    component.searchText = 'nonexistent';
    component.onSearchChange();
    expect(component.filteredTickets.length).toBe(0);
  });

  it('should navigate to ticket details', () => {
    component.viewDetails('T1');

    expect(router.navigate).toHaveBeenCalledWith(['/enduser/track-ticket'], { queryParams: { id: 'T1' } });
  });
});
