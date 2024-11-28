import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lore2Component } from './lore-2.component';

describe('Lore2Component', () => {
  let component: Lore2Component;
  let fixture: ComponentFixture<Lore2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lore2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lore2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
