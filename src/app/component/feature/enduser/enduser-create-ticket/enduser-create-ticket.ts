import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlatformService } from '../../../../core/service/platform-service';
import { CreateTicket, Priority, TicketStatus } from '../model/create-ticket';
import { MatOptionModule } from '@angular/material/core';
import { LocalStorageKeys } from '../../../../core/constant/local-session-enum';
import { PersistentAuthService } from '../../../../core/service/persistent-auth';

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
    TextFieldModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './enduser-create-ticket.html',
  styleUrl: './enduser-create-ticket.scss'
})
export class EnduserCreateTicket implements OnInit {
  isDirty: boolean = false;
  ticketForm!: FormGroup;
  Priority = Priority; // reference enum in template

  priorities = [
    { value: Priority.Low, label: 'Low' },
    { value: Priority.Medium, label: 'Medium' },
    { value: Priority.High, label: 'High' }
  ];
  constructor(private platformService: PlatformService,
     private fb: FormBuilder,
    private persistentAuthService: PersistentAuthService) { }
  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [1] // Optional field with a default value
    });
    this.ticketForm.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }
  submitCreateTicketForm() {
    const userData = this.persistentAuthService.userDetails;
    const request: CreateTicket = {
      UserId: userData ? userData.userId : undefined,
      Title: this.ticketForm.get('title')?.value,
      Description: this.ticketForm.get('description')?.value,
      Status: TicketStatus.Open,
      Priority: this.ticketForm.get('priority')?.value,
      Attachment: null
    };
    this.platformService.createTicket(request).subscribe(response => {
      this.isDirty = false;
    }, error => {
      console.error('Error creating ticket:', error);
    });
  }
}
