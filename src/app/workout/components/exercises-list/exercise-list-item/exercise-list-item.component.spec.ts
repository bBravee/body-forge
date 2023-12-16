import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseListItemComponent } from './exercise-list-item.component';

describe('ExerciseListItemComponent', () => {
  let component: ExerciseListItemComponent;
  let fixture: ComponentFixture<ExerciseListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseListItemComponent]
    });
    fixture = TestBed.createComponent(ExerciseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
