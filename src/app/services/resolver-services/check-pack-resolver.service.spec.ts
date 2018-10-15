import { TestBed, inject } from "@angular/core/testing";

import { CheckPackResolverService } from "./check-pack-resolver.service";

describe("CheckPackService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPackResolverService]
    });
  });

  it("should be created", inject(
    [CheckPackResolverService],
    (service: CheckPackResolverService) => {
      expect(service).toBeTruthy();
    }
  ));
});
