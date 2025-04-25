import { Component, input, output } from '@angular/core';
import { slideInRight, slideInRightFastAndSlow } from 'src/app/animations/animations';
import { RivalsCard } from '../models/RivalsCard';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-details-comment',
  imports: [DatePipe],
  templateUrl: './card-details-comment.component.html',
  styleUrl: './card-details-comment.component.scss',
  animations: [slideInRight]
})
export class CardDetailsCommentComponent {

  public closeCardDetailsComment = output();
  public card = input.required<RivalsCard>();

}
