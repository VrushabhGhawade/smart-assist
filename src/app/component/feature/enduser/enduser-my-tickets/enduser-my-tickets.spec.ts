import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserMyTickets } from './enduser-my-tickets';

describe('EnduserMyTickets', () => {
  let component: EnduserMyTickets;
  let fixture: ComponentFixture<EnduserMyTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnduserMyTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduserMyTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
