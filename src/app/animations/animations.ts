import { style, animate, trigger, transition } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [ 
    transition('void => *', [
      style({ opacity: 0 }), 
      animate(2000, style({opacity: 1}))
    ]) 
]);

export const fadeInFast = trigger('fadeInFast', [ 
  transition('void => *', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1}))
  ]) 
]);

export const fadeInOut = trigger('fadeInOut', [ 
  transition('void => *', [
    style({ opacity: 0 }), 
    animate(700, style({opacity: 1}))
  ]),
  transition('* => void', [
    style({ opacity: 1 }), 
    animate(700, style({opacity: 0}))
  ]) 
]);