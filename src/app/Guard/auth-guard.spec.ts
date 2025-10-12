import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PersistentAuthService } from '../core/service/persistent-auth';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<PersistentAuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('PersistentAuthService', [], { userToken: null });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: PersistentAuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(PersistentAuthService) as jasmine.SpyObj<PersistentAuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('✅ should allow activation if userToken is not null', () => {
    Object.defineProperty(authService, 'userToken', { value: 'mockToken', writable: true });

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/dashboard' } as any)
    );

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('🚫 should block activation and navigate to login if userToken is null', () => {
    Object.defineProperty(authService, 'userToken', { value: null, writable: true });
    spyOn(localStorage, 'clear');

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/home-page' } as any)
    );

    expect(result).toBeFalse();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/home-page' }
    });
  });
});
