import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { auntCanactGuard } from './aunt-canact.guard';

describe('auntCanactGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auntCanactGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
