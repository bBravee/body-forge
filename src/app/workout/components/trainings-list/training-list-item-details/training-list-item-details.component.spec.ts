import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingListItemDetailsComponent } from './training-list-item-details.component';

describe('TrainingListItemDetailsComponent', () => {
  let component: TrainingListItemDetailsComponent;
  let fixture: ComponentFixture<TrainingListItemDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingListItemDetailsComponent]
    });
    fixture = TestBed.createComponent(TrainingListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
