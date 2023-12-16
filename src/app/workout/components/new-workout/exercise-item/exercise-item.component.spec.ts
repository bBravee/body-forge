import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseItemComponent } from './exercise-item.component';

describe('ExerciseItemComponent', () => {
  let component: ExerciseItemComponent;
  let fixture: ComponentFixture<ExerciseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseItemComponent]
    });
    fixture = TestBed.createComponent(ExerciseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
