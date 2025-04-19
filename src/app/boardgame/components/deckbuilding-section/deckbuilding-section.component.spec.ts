import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckbuildingSectionComponent } from './deckbuilding-section.component';

describe('DeckbuildingSectionComponent', () => {
  let component: DeckbuildingSectionComponent;
  let fixture: ComponentFixture<DeckbuildingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckbuildingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckbuildingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
