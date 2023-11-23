import { ResolveFn } from '@angular/router';

export const scrollToElementResolver: ResolveFn<void> = (route, state) => {
  const originId = route.queryParams['origin'];

  console.log("ID d'origine: ", originId);

  if (originId) {
    const element = document.getElementById(originId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
