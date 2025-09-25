import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlatformService } from '../../../../core/service/platform-service';
import { CreateTicket } from '../model/create-ticket';

@Component({
  selector: 'smart-assist-enduser-create-ticket',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    TextFieldModule
  ],
  templateUrl: './enduser-create-ticket.html',
  styleUrl: './enduser-create-ticket.scss'
})
export class EnduserCreateTicket {

  constructor(private platformService: PlatformService) { }

  submitCreateTicketForm() {
    const userData = localStorage.getItem('userData');
    const request: CreateTicket = {
      UserId: userData ? JSON.parse(userData).userId : undefined,
      Title: 'Sample Ticket Title',
      Description: 'Detailed description',
      Status: 1,
      Priority: 1,
      CreatedBy: userData ? JSON.parse(userData).userName : undefined,
      AssignedToId: '5c2c5b38-1410-4375-be38-3a76c1b76768',
      AssignedToName: 'se@nitoplus.com',
      Attachment: null
    };
    this.platformService.createTicket(request).subscribe(response => {
      console.log('Ticket created successfully:', response);
    }, error => {
      console.error('Error creating ticket:', error);
    });
  }
}
