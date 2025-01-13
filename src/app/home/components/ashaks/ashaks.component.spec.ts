import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshaksComponent } from './ashaks.component';

describe('AshaksComponent', () => {
  let component: AshaksComponent;
  let fixture: ComponentFixture<AshaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AshaksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
