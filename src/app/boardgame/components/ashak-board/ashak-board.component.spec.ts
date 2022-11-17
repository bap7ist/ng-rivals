import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshakBoardComponent } from './ashak-board.component';

describe('AshakBoardComponent', () => {
  let component: AshakBoardComponent;
  let fixture: ComponentFixture<AshakBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AshakBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshakBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
