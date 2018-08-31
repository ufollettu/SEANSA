import { TestBed, inject } from '@angular/core/testing';

import { CustomizeApiService } from './customize-api.service';

describe('CustomizeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomizeApiService]
    });
  });

  it('should be created', inject([CustomizeApiService], (service: CustomizeApiService) => {
    expect(service).toBeTruthy();
  }));
});
