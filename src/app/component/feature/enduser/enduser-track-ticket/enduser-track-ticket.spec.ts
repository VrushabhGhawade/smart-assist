import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserTrackTicket } from './enduser-track-ticket';

describe('EnduserTrackTicket', () => {
  let component: EnduserTrackTicket;
  let fixture: ComponentFixture<EnduserTrackTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnduserTrackTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduserTrackTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
