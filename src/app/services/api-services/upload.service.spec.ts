import { TestBed, inject } from '@angular/core/testing';

import { UploadFileService } from './upload.service';

describe('UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadFileService]
    });
  });

  it('should be created', inject([UploadFileService], (service: UploadFileService) => {
    expect(service).toBeTruthy();
  }));
});
