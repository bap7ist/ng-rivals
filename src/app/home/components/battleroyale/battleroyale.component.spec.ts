import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleroyaleComponent } from './battleroyale.component';

describe('BattleroyaleComponent', () => {
  let component: BattleroyaleComponent;
  let fixture: ComponentFixture<BattleroyaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleroyaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleroyaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
