import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'smart-assist-enduser-home-page',
  imports: [
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './enduser-home-page.html',
  styleUrl: './enduser-home-page.scss'
})
export class EnduserHomePage {
  ticketMetrics = {
    open: 5,
    inProgress: 2,
    resolved: 12,
    closed: 25
  };

  recentTickets = [
    { title: 'Server connectivity issue', status: 'Closed', lastUpdated: new Date('2025-09-19') },
    { title: 'UI bug on mobile', status: 'In Progress', lastUpdated: new Date('2025-09-18') },
    { title: 'New feature request', status: 'Open', lastUpdated: new Date('2025-09-17') },
    { title: 'Password reset failure', status: 'Resolved', lastUpdated: new Date('2025-09-16') }
  ];

  getIconForStatus(status: string): string {
    switch(status) {
      case 'Open': return 'error_outline';
      case 'In Progress': return 'update';
      case 'Resolved': return 'check_circle_outline';
      case 'Closed': return 'task_alt';
      default: return 'help_outline';
    }
  }
}