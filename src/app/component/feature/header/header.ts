import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'smart-assist-header',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  toggleMenu() {
    // Logic to open/close a side navigation menu
    console.log('Menu button clicked!');
  }

  logout() {
    // Logic to handle user logout
    console.log('Logout button clicked!');
  }
}
