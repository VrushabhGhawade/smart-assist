import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LiveChat } from './live-chat';

describe('LiveChat', () => {
  let component: LiveChat;
  let fixture: ComponentFixture<LiveChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveChat] // ✅ standalone component import
    }).compileComponents();

    fixture = TestBed.createComponent(LiveChat);
    component = fixture.componentInstance;

    // ✅ Use type assertion to bypass 'private' restriction
    (component as any).chatHistoryContainer = new ElementRef({
      scrollTop: 0,
      scrollHeight: 100
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send a user message and clear input', fakeAsync(() => {
    spyOn(component as any, 'scrollToBottom'); // spy on private method via cast

    component.currentMessage = 'Hello there!';
    component.sendMessage();

    const lastMessage = component.messages[component.messages.length - 1];
    expect(lastMessage.text).toBe('Hello there!');
    expect(lastMessage.sender).toBe('user');
    expect(component.currentMessage).toBe('');
    expect((component as any).scrollToBottom).toHaveBeenCalled();

    tick(1000);

    const finalMessage = component.messages[component.messages.length - 1];
    expect(finalMessage.sender).toBe('other');
    expect(finalMessage.text).toContain('Thank you for your message');
    expect((component as any).scrollToBottom).toHaveBeenCalledTimes(2);
  }));

  it('should not send a message when input is empty', () => {
    const initialLength = component.messages.length;
    component.currentMessage = '   ';
    component.sendMessage();
    expect(component.messages.length).toBe(initialLength);
  });

  it('should scroll to bottom safely', fakeAsync(() => {
    const mockElement = { scrollTop: 0, scrollHeight: 200 };
    (component as any).chatHistoryContainer = new ElementRef(mockElement);

    component.scrollToBottom();
    tick();

    expect(mockElement.scrollTop).toBe(mockElement.scrollHeight);
  }));
});
