import { TestBed } from '@angular/core/testing';

import { TrainingStatisticsService } from './training-statistics.service';

describe('TrainingStatisticsService', () => {
  let service: TrainingStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
