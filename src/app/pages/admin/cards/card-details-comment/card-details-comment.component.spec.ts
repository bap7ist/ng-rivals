import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsCommentComponent } from './card-details-comment.component';

describe('CardDetailsCommentComponent', () => {
  let component: CardDetailsCommentComponent;
  let fixture: ComponentFixture<CardDetailsCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailsCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetailsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
