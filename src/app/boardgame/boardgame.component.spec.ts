import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardgameComponent } from './boardgame.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

describe('BoardgameComponent', () => {
  let component: BoardgameComponent;
  let fixture: ComponentFixture<BoardgameComponent>;
  let storeMock: any;
  let routerMock: any;
  let breakpointObserverMock: any;

  beforeEach(() => {
    storeMock = {
      select: jest.fn(),
    };

    routerMock = {
      events: of({}),
      url: '/gameplay/ashak-board',
      navigate: jest.fn(),
    };

    breakpointObserverMock = {
      observe: jest.fn(() => of({ matches: false })),
    };

    TestBed.configureTestingModule({
    imports: [BoardgameComponent],
    providers: [
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(BoardgameComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    // Mock a subject that is used with takeUntil
    const unsubscribeSubject = new Subject<void>();
    component['unsubscribe$'] = unsubscribeSubject;
  
    const nextSpy = jest.spyOn(unsubscribeSubject, 'next');
    const completeSpy = jest.spyOn(unsubscribeSubject, 'complete');
  
    component.ngOnDestroy();
  
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
