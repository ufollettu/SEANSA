import { TestBed, inject } from '@angular/core/testing';

import { DataComponentsManagementService } from './data-components-management.service';

describe('DataComponentsManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataComponentsManagementService]
    });
  });

  it('should be created', inject([DataComponentsManagementService], (service: DataComponentsManagementService) => {
    expect(service).toBeTruthy();
  }));
});
