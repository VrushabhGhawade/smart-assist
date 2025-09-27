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

  constructor() { }

  trackTicket(): void {
    if (!this.ticketId) {
      return;
    }

    this.isLoading = true;
    this.isSearched = true;
    this.lastSearchedId = this.ticketId;
    this.ticket = null; // Clear previous results

    // Simulate an API call with a delay
    setTimeout(() => {
      // Dummy data for demonstration. In a real app, this would be an HTTP call.
      if (this.ticketId === '12345') {
        this.ticket = {
          id: 12345,
          subject: 'Issue with network connection',
          status: 'in-progress',
          createdDate: new Date('2025-09-20'),
          lastUpdatedDate: new Date('2025-09-27'),
          description: 'Experiencing intermittent network drops on my laptop. This is affecting my ability to work on critical tasks.',
        };
      } else {
        this.ticket = null; // No ticket found
      }

      this.isLoading = false;
    }, 1500);
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