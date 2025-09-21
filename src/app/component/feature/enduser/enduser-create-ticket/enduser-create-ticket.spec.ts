import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserCreateTicket } from './enduser-create-ticket';

describe('EnduserCreateTicket', () => {
  let component: EnduserCreateTicket;
  let fixture: ComponentFixture<EnduserCreateTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnduserCreateTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduserCreateTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
