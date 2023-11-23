import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { scrollToElementResolver } from './scroll-to-element.resolver';

describe('scrollToElementResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => scrollToElementResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
