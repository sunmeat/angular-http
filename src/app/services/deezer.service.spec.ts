import { TestBed } from '@angular/core/testing';

import { DeezerService } from './deezer.service';

describe('DeezerService', () => {
  let service: DeezerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeezerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
