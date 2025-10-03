import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject, exhaustMap, tap, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/service/auth-service';
import { Header } from "../header/header";
import { LocalStorageKeys } from '../../../core/constant/local-session-enum';
import { PersistentAuthService } from '../../../core/service/persistent-auth';
import { UserRole } from '../../../core/constant/auth-enum';

@Component({
  selector: 'smart-assist-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    Header
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnDestroy {
  username = '';
  password = '';



  // onLogin() {
  //   console.log('Username:', this.username);
  //   console.log('Password:', this.password);
  //   // call your login service here
  // }

  private loginClick$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private persistentAuthService: PersistentAuthService) {
    // When loginClick$ emits, run the login flow
    this.loginClick$
      .pipe(
        exhaustMap(() =>
          this.authService.login(this.username, this.password).pipe(
            tap((result) => {
              if (result) {
                this.persistentAuthService.userToken = result;
                this.authService.validateToken().subscribe(x => {

                  if (x.userRole == UserRole.Student) {
                    this.persistentAuthService.userDetails = x;
                    this.ngZone.run(() => {
                      this.router.navigate(['/enduser']);
                    });
                  } else {
                    alert('You are not authorized to access this application');
                  }
                })
              } else {
                alert('Invalid credentials');
              }
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onLogin() {
    // emit an event to start login flow
    this.loginClick$.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
