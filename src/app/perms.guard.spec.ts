import { TestBed, async, inject } from '@angular/core/testing';

import { PermsGuard } from './perms.guard';

describe('PermsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermsGuard]
    });
  });

  it('should ...', inject([PermsGuard], (guard: PermsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
