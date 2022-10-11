import { style, animate, trigger, transition } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [ 
    transition('void => *', [
      style({ opacity: 0 }), 
      animate(2000, style({opacity: 1}))
    ]) 
]);