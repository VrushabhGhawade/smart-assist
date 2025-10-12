import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnduserTrackTicket } from './enduser-track-ticket';
import { PlatformService } from '../../../../core/service/platform-service';
import { PersistentAuthService } from '../../../../core/service/persistent-auth';
import { ActivatedRoute } from '@angular/router';
import { of, throwError, Subject } from 'rxjs';
import { Ticket } from '../model/create-ticket';

describe('EnduserTrackTicket', () => {
  let component: EnduserTrackTicket;
  let fixture: ComponentFixture<EnduserTrackTicket>;
  let platformService: jasmine.SpyObj<PlatformService>;
  let persistentAuthService: jasmine.SpyObj<PersistentAuthService>;
  let queryParamsSubject: Subject<any>;

  const mockTicketResponse:Ticket[] = [{
    ticketId: 'T1',
    userId: 'user1',
    title: 'Issue A',
    description: 'Description A',
    status: 1,
    priority: 2,
    createdBy: 'admin',
    age: 1
  }];

  beforeEach(async () => {
    queryParamsSubject = new Subject();

    const platformSpy = jasmine.createSpyObj('PlatformService', ['trackTicket']);
    const authSpy = jasmine.createSpyObj('PersistentAuthService', [], {
      userDetails: { userId: 'user1' }
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: PlatformService, useValue: platformSpy },
        { provide: PersistentAuthService, useValue: authSpy },
        { provide: ActivatedRoute, useValue: { queryParams: queryParamsSubject.asObservable() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnduserTrackTicket);
    component = fixture.componentInstance;
    platformService = TestBed.inject(PlatformService) as jasmine.SpyObj<PlatformService>;
    persistentAuthService = TestBed.inject(PersistentAuthService) as jasmine.SpyObj<PersistentAuthService>;
  });

  it('should set ticketId from query params and call trackTicket', () => {
    spyOn(component, 'trackTicket');

    queryParamsSubject.next({ id: '' });

    expect(component.ticketId).toBe('');
    expect(component.trackTicket).toHaveBeenCalled();
  });

  it('should track ticket successfully', () => {
    platformService.trackTicket.and.returnValue(of(mockTicketResponse));
    component.ticketId = 'T1';

    component.trackTicket();

    expect(component.isLoading).toBe(false);
    expect(component.isSearched).toBe(true);
    expect(component.lastSearchedId).toBe('T1');
    expect(platformService.trackTicket).toHaveBeenCalledWith('T1', 'user1');
  });

  it('should handle trackTicket error', () => {
    platformService.trackTicket.and.returnValue(throwError(() => new Error('API error')));
    component.ticketId = 'T1';

    component.trackTicket();

    expect(component.isLoading).toBe(false);
    expect(component.isSearched).toBe(true);
    expect(component.lastSearchedId).toBe('T1');
  });

  it('should not call trackTicket if ticketId is empty', () => {
    component.ticketId = '';
    component.trackTicket();
    expect(platformService.trackTicket).not.toHaveBeenCalled();
  });

  it('should return correct CSS class for ticket status', () => {
    expect(component.getTicketStatusClass('open')).toBe('status-open');
    expect(component.getTicketStatusClass('in-progress')).toBe('status-in-progress');
    expect(component.getTicketStatusClass('resolved')).toBe('status-resolved');
    expect(component.getTicketStatusClass('closed')).toBe('status-closed');
    expect(component.getTicketStatusClass('unknown')).toBe('');
  });
});
