import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'smart-assist-live-chat',
  imports: [
     FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    TextFieldModule
  ],
  templateUrl: './live-chat.html',
  styleUrl: './live-chat.scss'
})
export class LiveChat {
 @ViewChild('chatHistoryContainer', { static: false }) private chatHistoryContainer!: ElementRef;

  currentMessage: string = '';
  messages: { text: string, sender: 'user' | 'other' }[] = [
    { text: 'Hello, how can I help you today?', sender: 'other' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Scroll to the bottom on initial load
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.currentMessage.trim()) {
      this.messages.push({ text: this.currentMessage, sender: 'user' });
      this.currentMessage = '';
      this.scrollToBottom();

      // Simulate a response from the "other" user
      setTimeout(() => {
        this.messages.push({ text: 'Thank you for your message. An agent will be with you shortly.', sender: 'other' });
        this.scrollToBottom();
      }, 1000);
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatHistoryContainer.nativeElement.scrollTop = this.chatHistoryContainer.nativeElement.scrollHeight;
      }, 0);
    } catch(err) { }
  }
}
