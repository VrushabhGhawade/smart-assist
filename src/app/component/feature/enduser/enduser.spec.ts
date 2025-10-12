import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Enduser } from './enduser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('Enduser Component', () => {
  let component: Enduser;
  let fixture: ComponentFixture<Enduser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Enduser,
        CommonModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        RouterTestingModule // This provides RouterOutlet & ActivatedRoute mocks
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Enduser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have showFiller default to false', () => {
    expect(component.showFiller).toBeFalse();
  });
});
