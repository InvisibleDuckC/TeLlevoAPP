import { TestBed } from '@angular/core/testing';

import { FirestoneService } from './firestone.service';

describe('FirestoneService', () => {
  let service: FirestoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
