import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickstarterComponent } from './kickstarter.component';

describe('KickstarterComponent', () => {
  let component: KickstarterComponent;
  let fixture: ComponentFixture<KickstarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickstarterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KickstarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
