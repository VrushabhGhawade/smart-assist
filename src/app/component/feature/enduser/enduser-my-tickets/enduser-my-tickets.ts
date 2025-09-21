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
  myTickets = [
    { id: 'TKT-001', title: 'Website navigation issue', status: 'Open', description: 'The main menu is not showing correctly on mobile devices.', assignedTo: 'You', createdDate: new Date('2025-09-10') },
    { id: 'TKT-004', title: 'Login button unresponsive', status: 'In Progress', description: 'The login button is greyed out for new users.', assignedTo: 'You', createdDate: new Date('2025-09-05') },
    { id: 'TKT-007', title: 'Dashboard statistics error', status: 'Open', description: 'The user statistics on the dashboard are showing incorrect values.', assignedTo: 'You', createdDate: new Date('2025-09-12') },
  ];
}
