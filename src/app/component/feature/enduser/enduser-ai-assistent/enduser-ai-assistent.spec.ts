import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EnduserAiAssistent } from './enduser-ai-assistent';

describe('EnduserAiAssistent', () => {
  let component: EnduserAiAssistent;
  let fixture: ComponentFixture<EnduserAiAssistent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnduserAiAssistent] // ✅ standalone component import
    }).compileComponents();

    fixture = TestBed.createComponent(EnduserAiAssistent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add user message and clear input', fakeAsync(() => {
    component.userInput = 'Hello AI!';
    component.sendMessage();

    // Verify user message added
    expect(component.messages[component.messages.length - 1]).toEqual({
      text: 'Hello AI!',
      sender: 'user'
    });

    // Verify input cleared
    expect(component.userInput).toBe('');

    // Simulate time passing for AI response
    tick(1000);

    // Verify AI response added
    const lastMessage = component.messages[component.messages.length - 1];
    expect(lastMessage.text).toBe('AI: You said, "Hello AI!".');
    expect(lastMessage.sender).toBe('ai');
  }));

  it('should not add message when input is empty', () => {
    component.userInput = '   '; // only spaces
    component.sendMessage();
    expect(component.messages.length).toBe(1); // only initial AI message
  });
});
