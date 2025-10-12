import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header] // ✅ standalone component import
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleMenu and log to console', () => {
    const consoleSpy = spyOn(console, 'log');
    component.toggleMenu();
    expect(consoleSpy).toHaveBeenCalledWith('Menu button clicked!');
  });

  it('should call logout and log to console', () => {
    const consoleSpy = spyOn(console, 'log');
    component.logout();
    expect(consoleSpy).toHaveBeenCalledWith('Logout button clicked!');
  });
});
