import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AshakComponent } from './ashak.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('AshakComponent', () => {
  let component: AshakComponent;
  let fixture: ComponentFixture<AshakComponent>;
  let storeMock: any;

  beforeEach(() => {
    storeMock = {
      select: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [AshakComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        BreakpointObserver,
        Router,
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AshakComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme$, ashaks, and selectedAshak$', () => {
    storeMock.select.mockReturnValueOnce(of('qikaa')); 
    storeMock.select.mockReturnValueOnce(of('qikaa')); 

    component.ngOnInit();

    expect(component.theme$).toBeDefined();
    expect(component.ashaks).toEqual([
      'qikaa',
      'atmos',
      'gyaleis',
      'renko',
      'orus',
      'yosh',
      'xhan',
      'phae',
    ]);
    expect(component.selectedAshak$).toBeDefined();
  });

  it('should toggle showOptions when openOptions is called', () => {
    component.showOptions = false;

    component.openOptions();

    expect(component.showOptions).toBe(true);

    component.openOptions();

    expect(component.showOptions).toBe(false);
  });
});
