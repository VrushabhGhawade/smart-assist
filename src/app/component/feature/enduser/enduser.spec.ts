import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enduser } from './enduser';

describe('Enduser', () => {
  let component: Enduser;
  let fixture: ComponentFixture<Enduser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enduser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Enduser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
