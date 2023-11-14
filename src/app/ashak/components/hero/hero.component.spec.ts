import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of  } from 'rxjs';
import { HeroComponent } from './hero.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AshakService } from 'src/app/shared/services/ashak.service';
import { HttpClientModule } from '@angular/common/http';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'qikaa' }), 
          },
        },
        AshakService,
        { provide: Store, useValue: { select: jest.fn(), dispatch: jest.fn() } },
        { provide: BreakpointObserver, useValue: { observe: jest.fn(() => of({ matches: false })) } },
      ],
      imports: [HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Ashak by name on component initialization', () => {
    const ashakServiceSpy = jest.spyOn(TestBed.inject(AshakService), 'fetchByName');

    component.ngOnInit();

    expect(ashakServiceSpy).toHaveBeenCalledWith('qikaa'); 
  });

  it('should unsubscribe on component destruction', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
