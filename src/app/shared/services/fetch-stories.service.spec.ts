import { TestBed } from '@angular/core/testing';

import { FetchStoriesService } from './fetch-stories.service';

describe('FetchStoriesService', () => {
  let service: FetchStoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchStoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
