import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckbuildComponent } from './deckbuild.component';

describe('DeckbuildComponent', () => {
  let component: DeckbuildComponent;
  let fixture: ComponentFixture<DeckbuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckbuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckbuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
