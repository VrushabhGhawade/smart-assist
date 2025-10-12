import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnduserHomePage } from './enduser-home-page';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

describe('EnduserHomePage', () => {
  let component: EnduserHomePage;
  let fixture: ComponentFixture<EnduserHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        CommonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnduserHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

 it('should return ticket metrics', () => {
  expect(component.ticketMetrics).toEqual({
    open: 5,
    inProgress: 2,
    resolved: 12,
    closed: 25
  });
});


  it('should have recent tickets defined', () => {
   const recentTickets = [
    { title: 'Server connectivity issue', status: 'Closed', lastUpdated: new Date('2025-09-19') },
    { title: 'UI bug on mobile', status: 'In Progress', lastUpdated: new Date('2025-09-18') },
    { title: 'New feature request', status: 'Open', lastUpdated: new Date('2025-09-17') },
    { title: 'Password reset failure', status: 'Resolved', lastUpdated: new Date('2025-09-16') }
  ];
  expect(component.recentTickets).toEqual(recentTickets)
  });

it('should return "error_outline" for Open status', () => {
    expect(component.getIconForStatus('Open')).toBe('error_outline');
  });

  it('should return "update" for In Progress status', () => {
    expect(component.getIconForStatus('In Progress')).toBe('update');
  });

  it('should return "check_circle_outline" for Resolved status', () => {
    expect(component.getIconForStatus('Resolved')).toBe('check_circle_outline');
  });

  it('should return "task_alt" for Closed status', () => {
    expect(component.getIconForStatus('Closed')).toBe('task_alt');
  });

  it('should return "help_outline" for unknown status', () => {
    expect(component.getIconForStatus('Pending')).toBe('help_outline');
    expect(component.getIconForStatus('')).toBe('help_outline');
    expect(component.getIconForStatus('random')).toBe('help_outline');
  });
});
