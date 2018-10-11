import { TestBed, inject } from '@angular/core/testing';

import { ApiResolverService } from './api-resolver.service';

describe('ApiResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiResolverService]
    });
  });

  it('should be created', inject([ApiResolverService], (service: ApiResolverService) => {
    expect(service).toBeTruthy();
  }));
});
