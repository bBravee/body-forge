import { TestBed } from '@angular/core/testing';

import { AddExerciseFormService } from './add-exercise-form.service';

describe('AddExerciseFormService', () => {
  let service: AddExerciseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExerciseFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
