import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserHomePage } from './enduser-home-page';

describe('EnduserHomePage', () => {
  let component: EnduserHomePage;
  let fixture: ComponentFixture<EnduserHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnduserHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduserHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
