import { TestBed, inject } from '@angular/core/testing';

import { ProtectorService } from './protector.service';

describe('ProtectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtectorService]
    });
  });

  it('should be created', inject([ProtectorService], (service: ProtectorService) => {
    expect(service).toBeTruthy();
  }));
});
