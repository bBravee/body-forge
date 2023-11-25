import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userFeaturesGuard } from './user-features.guard';

describe('userFeaturesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userFeaturesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
