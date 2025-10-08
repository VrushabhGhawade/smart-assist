import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlatformService } from '../../../../core/service/platform-service';
import { PersistentAuthService } from '../../../../core/service/persistent-auth';
import { Ticket, TicketStatus } from '../model/create-ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-assist-enduser-my-tickets',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './enduser-my-tickets.html',
  styleUrl: './enduser-my-tickets.scss'
})
export class EnduserMyTickets {
  myTickets: Ticket[] | undefined;
  ticketStatus = TicketStatus;
  filteredTickets: Ticket[] = [];
  selectedStatus: TicketStatus | null = null;
  searchText: string = '';

  constructor(private platformService: PlatformService,
    private persistentAuthService: PersistentAuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.myTicket();
  }

  myTicket() {
    const userId = this.persistentAuthService.userDetails?.userId;
    if (userId) {
      this.platformService.getAllTicketTicketByUserId(userId).subscribe(response => {
        this.myTickets = response;
        this.filteredTickets = this.myTickets;
      }, error => {
        console.error('Error creating ticket:', error);
      });
    }
  }
  viewDetails(ticketId: string) {
    this.router.navigate(['/enduser/track-ticket'], { queryParams: { id: ticketId } });
  }
  onStatusChange(status: TicketStatus) {
    if (this.myTickets) {
      if (status === null) {
        this.filteredTickets = [...this.myTickets];
      } else {
        this.filteredTickets = this.myTickets.filter(ticket => ticket.status === status);
      }
    }
  }
  onSearchChange() {
    const search = this.searchText.toLowerCase();
    if (this.myTickets) {
      this.filteredTickets = this.myTickets.filter(ticket =>
        ticket.ticketId.toLowerCase().includes(search) ||
        ticket.title.toLowerCase().includes(search) ||
        TicketStatus[ticket.status].toLowerCase().includes(search)
      );
    }
  }
}
