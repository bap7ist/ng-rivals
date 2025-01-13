import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshaksMobileComponent } from './ashaks-mobile.component';

describe('AshaksMobileComponent', () => {
  let component: AshaksMobileComponent;
  let fixture: ComponentFixture<AshaksMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AshaksMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshaksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
