import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EnduserCreateTicket } from './enduser-create-ticket';
import { PlatformService } from '../../../../core/service/platform-service';
import { FormBuilder } from '@angular/forms';
import { PersistentAuthService } from '../../../../core/service/persistent-auth';
import { of, throwError } from 'rxjs';
import { TicketStatus } from '../model/create-ticket';

describe('EnduserCreateTicket - Constructor', () => {
  let component: EnduserCreateTicket;
  let fixture: ComponentFixture<EnduserCreateTicket>;
  let platformServiceSpy: jasmine.SpyObj<PlatformService>;
  let persistentAuthServiceSpy: jasmine.SpyObj<PersistentAuthService>;

  beforeEach(async () => {
    // 🧩 Create spies (mock dependencies)
    platformServiceSpy = jasmine.createSpyObj('PlatformService', ['createTicket']);
    persistentAuthServiceSpy = jasmine.createSpyObj('PersistentAuthService', [], { userDetails: { userId: 'b1a7d9d4-2e9b-4b1c-8c25-4c2b5f6e6f87' } });

    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: PlatformService, useValue: platformServiceSpy },
        { provide: PersistentAuthService, useValue: persistentAuthServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnduserCreateTicket);
    component = fixture.componentInstance;
  });

  it('should create the component and inject dependencies', () => {
    // ✅ Check component instance is created
    expect(component).toBeTruthy();

    // ✅ Verify injected services are defined
    expect(component['platformService']).toBeDefined();
    expect(component['fb']).toBeDefined();
    expect(component['persistentAuthService']).toBeDefined();

    // ✅ Ensure initial property values
    expect(component.isDirty).toBeFalse();
    expect(component.Priority).toBeDefined();
  });
  it('should initialize ticketForm with default values and validators', () => {
    // 🔹 Call ngOnInit() manually
    component.ngOnInit();

    // ✅ Form should be defined
    expect(component.ticketForm).toBeDefined();

    // ✅ Form controls should exist
    const titleControl = component.ticketForm.get('title');
    const descriptionControl = component.ticketForm.get('description');
    const priorityControl = component.ticketForm.get('priority');

    expect(titleControl).toBeTruthy();
    expect(descriptionControl).toBeTruthy();
    expect(priorityControl).toBeTruthy();

    // ✅ Default value of priority should be 1
    expect(priorityControl?.value).toBe(1);

    // ✅ title and description should be required
    titleControl?.setValue('');
    descriptionControl?.setValue('');

    expect(titleControl?.valid).toBeFalse();
    expect(descriptionControl?.valid).toBeFalse();

    // ✅ When filled, form becomes valid
    titleControl?.setValue('Issue title');
    descriptionControl?.setValue('Some description');
    priorityControl?.setValue(2);
    expect(component.ticketForm.valid).toBeTrue();
  });
  it('should call createTicket and reset isDirty on success', fakeAsync(() => {
    // Arrange: Fill form
    component.ticketForm.get('title')?.setValue('Issue title');
    component.ticketForm.get('description')?.setValue('Some description');
    component.ticketForm.get('priority')?.setValue(2);
    component.isDirty = true;

    // Mock service response
    platformServiceSpy.createTicket.and.returnValue(of({ success: true }));

    // Act: Submit form
    component.submitCreateTicketForm();
    tick(); // simulate async

    // Assert
    expect(platformServiceSpy.createTicket).toHaveBeenCalledWith({
      UserId: 'b1a7d9d4-2e9b-4b1c-8c25-4c2b5f6e6f87',
      Title: 'Issue title',
      Description: 'Some description',
      Status: TicketStatus.Open,
      Priority: 2,
      Attachment: null
    });
    expect(component.isDirty).toBeFalse();
  }));

 it('should submit ticket successfully and set isDirty to false', () => {
    // Arrange
    platformServiceSpy.createTicket.and.returnValue(of({ success: true }));

    // Act
    component.submitCreateTicketForm();

    // Assert
    expect(platformServiceSpy.createTicket).toHaveBeenCalledWith({
      UserId: '123',
      Title: 'Test Ticket',
      Description: 'This is a test ticket',
      Status: TicketStatus.Open,
      Priority: 1,
      Attachment: null
    });
    expect(component.isDirty).toBeFalse();
  });

  it('should log an error if createTicket fails', () => {
    // Arrange
    const consoleSpy = spyOn(console, 'error');
    const mockError = new Error('Failed to create ticket');

    platformServiceSpy.createTicket.and.returnValue(throwError(() => mockError));

    // Act
    component.submitCreateTicketForm();

    // Assert
    expect(platformServiceSpy.createTicket).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error creating ticket:', mockError);
  });


});
