import { TestBed, inject } from '@angular/core/testing';

import { IpService } from './ip.service';

describe('GetIpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpService]
    });
  });

  it('should be created', inject([IpService], (service: IpService) => {
    expect(service).toBeTruthy();
  }));
});
