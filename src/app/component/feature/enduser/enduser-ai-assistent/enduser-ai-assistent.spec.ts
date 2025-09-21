import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserAiAssistent } from './enduser-ai-assistent';

describe('EnduserAiAssistent', () => {
  let component: EnduserAiAssistent;
  let fixture: ComponentFixture<EnduserAiAssistent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnduserAiAssistent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduserAiAssistent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
