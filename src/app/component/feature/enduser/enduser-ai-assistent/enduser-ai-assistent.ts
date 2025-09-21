import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'smart-assist-enduser-ai-assistent',
  imports: [FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule],
  templateUrl: './enduser-ai-assistent.html',
  styleUrl: './enduser-ai-assistent.scss'
})
export class EnduserAiAssistent {
 userInput= '';
  messages: { text: string, sender: 'user' | 'ai' }[] = [
    { text: "Hello! I am your AI assistant. How can I help you?", sender: 'ai' }
  ];

  sendMessage() {
    if (this.userInput.trim()) {
      // Add user message to the chat history
      this.messages.push({ text: this.userInput, sender: 'user' });

      // TODO: Here you would integrate with an AI service to get a response
      // For now, we'll simulate an AI response
      setTimeout(() => {
        this.messages.push({ text: `AI: You said, "${this.userInput}".`, sender: 'ai' });
      }, 1000);

      // Clear the input field
      this.userInput = '';
    }
  }
}
