import { TestBed, inject } from '@angular/core/testing';

import { RolesApiService } from './roles-api.service';

describe('RolesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesApiService]
    });
  });

  it('should be created', inject([RolesApiService], (service: RolesApiService) => {
    expect(service).toBeTruthy();
  }));
});
