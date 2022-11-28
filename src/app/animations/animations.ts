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

export const fadeOut = trigger('fadeOut', [ 
  transition('* => void', [
    style({ opacity: 1 }), 
    animate(300, style({opacity: 0}))
  ]) 
]);

export const fadeInOutFast = trigger('fadeInOutFast', [ 
  transition('void => *', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1}))
  ]),
  transition('* => void', [
    style({ opacity: 1 }), 
    animate(300, style({opacity: 0}))
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

export const slideInLeft = trigger("slideInLeft", [
  transition(":enter", [
    style({
      transform: "translateX(-100%)"
    }),
    animate(
      "200ms",
      style({
        transform: "translateX(0)",
        display: "flex"
      })
    )
  ]),
  transition(":leave", [
    style({
      transform: "translateX(0)",
      display: "flex"
    }),
    animate(
      "200ms",
      style({
        transform: "translateX(-100%)"
      })
    )
  ])
]);

export const slideInRight = trigger("slideInRight", [
  transition(":enter", [
    style({
      transform: "translateX(100%)"
    }), 
    animate(
      "200ms",
      style({
        transform: "translateX(0)",
        display: "flex"
      })
    )
  ]), 
  transition(":leave", [
    style({
      transform: "translateX(0)",
      display: "flex"
    }),
    animate(
      "200ms",
      style({
        transform: "translateX(100%)"
      })
    )
  ])
]);
export const slideInLeftFastAndSlow = trigger("slideInLeftFastAndSlow", [
  transition(":enter", [
    style({
      transform: "translateX(-100%)"
    }),
    animate(
      "200ms",
      style({
        transform: "translateX(0)",
        display: "flex"
      })
    )
  ]),
  transition(":leave", [
    style({
      transform: "translateX(0)",
      display: "flex"
    }),
    animate(
      "500ms",
      style({
        transform: "translateX(-100%)"
      })
    )
  ])
]);
export const slideInRightFastAndSlow = trigger("slideInRightFastAndSlow", [
  transition(":enter", [
    style({
      transform: "translateX(100%)"
    }), 
    animate(
      "200ms",
      style({
        transform: "translateX(0)",
        display: "flex"
      })
    )
  ]), 
  transition(":leave", [
    style({
      transform: "translateX(0)",
      display: "flex"
    }),
    animate(
      "500ms",
      style({
        transform: "translateX(100%)"
      })
    )
  ])
]);

export const slideInLeftSlow = trigger("slideInLeftSlow", [
  transition(":enter", [
    style({
      transform: "translateX(-100%)"
    }),
    animate(
      "500ms",
      style({
        transform: "translateX(0)",
        display: "flex"
      })
    )
  ]),
  transition(":leave", [
    style({
      transform: "translateX(0)",
      display: "flex"
    }),
    animate(
      "500ms",
      style({
        transform: "translateX(-100%)"
      })
    )
  ])
]);

export const slideInRightSlow = trigger("slideInRightSlow", [
  transition(":enter", [
    style({
      transform: "translateX(100%)"
    }), 
    animate(
      "500ms",
      style({
        transform: "translateX(0)",
        display: "flex"
      })
    )
  ]), 
  transition(":leave", [
    style({
      transform: "translateX(0)",
      display: "flex"
    }),
    animate(
      "500ms",
      style({
        transform: "translateX(100%)"
      })
    )
  ])
]);
export const slideInBottomSlow = trigger("slideInBottomSlow", [
  transition(":enter", [
    style({
      transform: "translateY(100%)"
    }), 
    animate(
      "500ms",
      style({
        transform: "translateY(0)",
        display: "flex"
      })
    )
  ]), 
  transition(":leave", [
    style({
      transform: "translateY(0)",
      display: "flex"
    }),
    animate(
      "500ms",
      style({
        transform: "translateY(100%)"
      })
    )
  ])
]);

export const slideInTopSlow = trigger("slideInTopSlow", [
  transition(":enter", [
    style({
      transform: "translateY(-100%)"
    }),
    animate(
      "500ms",
      style({
        transform: "translateY(0)",
        display: "flex"
      })
    )
  ]),
  transition(":leave", [
    style({
      transform: "translateY(0)",
      display: "flex"
    }),
    animate(
      "500ms",
      style({
        transform: "translateY(-100%)"
      })
    )
  ])
]);

