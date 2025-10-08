import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '../../../../core/service/platform-service';
import { PersistentAuthService } from '../../../../core/service/persistent-auth';

interface Ticket {
  id: number;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdDate: Date;
  lastUpdatedDate: Date;
  description: string;
}
@Component({
  selector: 'smart-assist-enduser-track-ticket',
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './enduser-track-ticket.html',
  styleUrl: './enduser-track-ticket.scss'
})
export class EnduserTrackTicket {
  ticketId: string = '';
  lastSearchedId: string = '';
  ticket: Ticket | null = null;
  isLoading: boolean = false;
  isSearched: boolean = false;


  constructor(private route: ActivatedRoute,
    private platformService: PlatformService,
    private persistentAuthService: PersistentAuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ticketId = params['id'];
      this.trackTicket();
    });
  }

  trackTicket(): void {
    if (!this.ticketId) {
      return;
    }

    this.isLoading = true;
    this.isSearched = true;
    this.lastSearchedId = this.ticketId;
    this.ticket = null; // Clear previous results
    const userId = this.persistentAuthService.userDetails?.userId;
    if (userId && this.ticketId) {
      this.platformService.trackTicket(this.ticketId, userId).subscribe(response => {
        this.isLoading = false;

      }, error => {
        this.isLoading = false;

      });
    }
  }

  getTicketStatusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in-progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  }

}