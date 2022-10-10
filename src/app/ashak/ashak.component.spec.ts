import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshakComponent } from './ashak.component';

describe('AshakComponent', () => {
  let component: AshakComponent;
  let fixture: ComponentFixture<AshakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AshakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
