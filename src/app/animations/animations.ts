import { style, animate, trigger, transition } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(2000, style({ opacity: 1 })),
  ]),
]);

export const fadeInFast = trigger('fadeInFast', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(300, style({ opacity: 1 })),
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition('* => void', [
    style({ opacity: 1 }),
    animate(300, style({ opacity: 0 })),
  ]),
]);

export const fadeInOutFast = trigger('fadeInOutFast', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(300, style({ opacity: 1 })),
  ]),
  transition('* => void', [
    style({ opacity: 1 }),
    animate(300, style({ opacity: 0 })),
  ]),
]);

export const fadeInOutExtraFast = trigger('fadeInOutFast', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(100, style({ opacity: 1 })),
  ]),
  transition('* => void', [
    style({ opacity: 1 }),
    animate(100, style({ opacity: 0 })),
  ]),
]);

export const fadeInOut = trigger('fadeInOut', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(700, style({ opacity: 1 })),
  ]),
  transition('* => void', [
    style({ opacity: 1 }),
    animate(700, style({ opacity: 0 })),
  ]),
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
    }),
    animate(
      '200ms',
      style({
        transform: 'translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      display: 'flex',
    }),
    animate(
      '200ms',
      style({
        transform: 'translateX(-100%)',
      })
    ),
  ]),
]);

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
    }),
    animate(
      '200ms',
      style({
        transform: 'translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      display: 'flex',
    }),
    animate(
      '200ms',
      style({
        transform: 'translateX(100%)',
      })
    ),
  ]),
]);
export const slideInLeftFastAndSlow = trigger('slideInLeftFastAndSlow', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
    }),
    animate(
      '200ms',
      style({
        transform: 'translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      display: 'flex',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateX(-100%)',
      })
    ),
  ]),
]);
export const slideInRightFastAndSlow = trigger('slideInRightFastAndSlow', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
    }),
    animate(
      '200ms',
      style({
        transform: 'translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      display: 'flex',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateX(100%)',
      })
    ),
  ]),
]);

export const slideInLeftSlow = trigger('slideInLeftSlow', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      display: 'flex',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateX(-100%)',
      })
    ),
  ]),
]);

export const slideInRightSlow = trigger('slideInRightSlow', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      display: 'flex',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateX(100%)',
      })
    ),
  ]),
]);
export const slideInBottomSlow = trigger('slideInBottomSlow', [
  transition(':enter', [
    style({
      transform: 'translateY(100%)',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateY(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)',
      display: 'flex',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateY(100%)',
      })
    ),
  ]),
]);

export const slideInTopSlow = trigger('slideInTopSlow', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateY(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)',
      display: 'flex',
    }),
    animate(
      '500ms',
      style({
        transform: 'translateY(-100%)',
      })
    ),
  ]),
]);

export const slideInTopFast = trigger('slideInTopFast', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
    }),
    animate(
      '100ms',
      style({
        transform: 'translateY(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)',
      display: 'flex',
    }),
    animate(
      '100ms',
      style({
        transform: 'translateY(-100%)',
      })
    ),
  ]),
]);

export const logoSlideTop = trigger('logoSlideTop', [
  transition(':enter', [
    style({
      transform: 'translateX(300%) translateY(-300%)',
    }),
    animate(
      '250ms',
      style({
        transform: 'translateY(0) translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0) translateX(0)',
      display: 'flex',
    }),
    animate(
      '250ms',
      style({
        transform: 'translateY(-300%) translateX(300%)',
      })
    ),
  ]),
]);

export const logoSlideBottom = trigger('logoSlideBottom', [
  transition(':enter', [
    style({
      transform: 'translateX(-300%) translateY(300%)',
    }),
    animate(
      '250ms',
      style({
        transform: 'translateY(0) translateX(0)',
        display: 'flex',
      })
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0) translateX(0)',
      display: 'flex',
    }),
    animate(
      '250ms',
      style({
        transform: 'translateY(-300%) translateX(300%)',
      })
    ),
  ]),
]);

export const blurInOut = trigger('blurInOut', [
  transition('void => *', [
    style({ filter: 'blur(5px)' }),
    animate(1200, style({ filter: 'blur(0px)' })),
  ]),
  transition('* => void', [
    style({ filter: 'blur(0px)' }),
    animate(200, style({ filter: 'blur(5px)' })),
  ]),
]);

export const letterSpacing = trigger('letterSpacing', [
  transition('void => *', [
    style({ letterSpacing: '4rem' }),
    animate(700, style({ letterSpacing: 'normal' })),
  ]),
]);
