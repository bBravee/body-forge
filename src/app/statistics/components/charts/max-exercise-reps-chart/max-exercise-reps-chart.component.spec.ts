import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxExerciseRepsChartComponent } from './max-exercise-reps-chart.component';

describe('MaxExerciseRepsChartComponent', () => {
  let component: MaxExerciseRepsChartComponent;
  let fixture: ComponentFixture<MaxExerciseRepsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxExerciseRepsChartComponent]
    });
    fixture = TestBed.createComponent(MaxExerciseRepsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
