import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Login } from './login';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth-service';
import { PersistentAuthService } from '../../../core/service/persistent-auth';
import { NgZone } from '@angular/core';
import { of } from 'rxjs';
import { UserRole } from '../../../core/constant/auth-enum';
import { AuthResponse, User } from '../../../core/model/auth';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';


describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: jasmine.SpyObj<AuthService>;
  let persistentAuthService: PersistentAuthService;
  let router: jasmine.SpyObj<Router>;
  let ngZone: jasmine.SpyObj<NgZone>;
  let alertSpy: jasmine.Spy;

  const mockAuthResponse: AuthResponse = { userToken: 'userToken', correlationId: 'guid' };
  const mockUserDetails: User = {
    entityControllerId: 1,
    email: 'john@example.com',
    niTOPLUSRole: 2,
    userRole: UserRole.Student,
    firstName: 'John',
    lastName: 'Doe',
    countryCode: '+91',
    phoneNumber: '9876543210',
    photo: 'photo.png',
    userId: 'user-123'
  };

beforeEach(async () => {
  const authSpy = jasmine.createSpyObj('AuthService', ['login', 'validateToken']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const zoneSpy = jasmine.createSpyObj('NgZone', ['run']);

  // MOCK login & validateToken BEFORE creating the component!
  authSpy.login.and.returnValue(of({ userToken: 'userToken', correlationId: 'guid' }));
  authSpy.validateToken.and.returnValue(of({
    userRole: UserRole.Student,
    firstName: 'John',
  } as any));
  zoneSpy.run.and.callFake((fn: Function) => fn());

  await TestBed.configureTestingModule({
    imports: [
      Login, Header, FormsModule, MatCardModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatIconModule, CommonModule
    ],
    providers: [
      { provide: AuthService, useValue: authSpy },
      { provide: Router, useValue: routerSpy },
      { provide: NgZone, useValue: zoneSpy },
      PersistentAuthService
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(Login);
  component = fixture.componentInstance;

  authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  ngZone = TestBed.inject(NgZone) as jasmine.SpyObj<NgZone>;
  persistentAuthService = TestBed.inject(PersistentAuthService);

  spyOn(window, 'alert');
});


  afterEach(() => {
    fixture.destroy();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should emit loginClick$ when onLogin is called', () => {
    spyOn(component['loginClick$'], 'next');
    component.onLogin();
    expect(component['loginClick$'].next).toHaveBeenCalled();
  });

  it('should login successfully and navigate for Student role', fakeAsync(() => {
    component.username = 'testuser';
    component.password = 'testpass';

    authService.login.and.returnValue(of(mockAuthResponse));
    authService.validateToken.and.returnValue(of(mockUserDetails));
    ngZone.run.and.callFake((fn: Function) => fn()); // simulate NgZone.run

    component.onLogin();
    tick();

    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpass');
    expect(persistentAuthService.userToken).toEqual(mockAuthResponse);
    expect(authService.validateToken).toHaveBeenCalled();
    expect(persistentAuthService.userDetails?.firstName).toBe('John');
    expect(router.navigate).toHaveBeenCalledWith(['/enduser']);
  }));

  it('should show alert if login returns empty AuthResponse', fakeAsync(() => {
    // Mock login to return an Observable of empty AuthResponse
    authService.login.and.returnValue(of({} as any));

    // No need to mock validateToken here, it won't be called because userToken is empty

    component.onLogin();
    tick();

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  }));


  it('should show alert if user role is not Student', fakeAsync(() => {
    component.username = 'testuser';
    component.password = 'testpass';

    // Mock login to return Observable of AuthResponse
    authService.login.and.returnValue(of({ userToken: 'userToken', correlationId: 'guid' }));

    // Mock validateToken to return Observable of a user with non-Student role
    const mockAdmin = {
      ...mockUserDetails,
      userRole: UserRole.Admin,
      firstName: 'Admin'
    } as any;

    authService.validateToken.and.returnValue(of(mockAdmin));

    // Mock NgZone.run to immediately execute
    ngZone.run.and.callFake((fn: Function) => fn());

    component.onLogin();
    tick();

    expect(window.alert).toHaveBeenCalledWith('You are not authorized to access this application');
  }));


  it('should clean up subscriptions on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

});
