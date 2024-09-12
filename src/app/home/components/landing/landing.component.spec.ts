import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LandingComponent } from './landing.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LandingComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize social networks on component initialization', () => {
    const socials = [{ name: 'Facebook', link: 'https://facebook.com' }];
    jest.spyOn(component['http'], 'get').mockReturnValue(of(socials));

    component.ngOnInit();

    expect(component.socialNetworks).toEqual(socials);
    expect(component.socialNetworks.every((social) => !social.show)).toBe(true);
  });

  it('should open Kickstarter link in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation();

    component.goToKS();

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.kickstarter.com/projects/unkind-games/rivals',
      '_blank'
    );
  });
});
