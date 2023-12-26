import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsListItemComponent } from './trainings-list-item.component';

describe('TrainingsListItemComponent', () => {
  let component: TrainingsListItemComponent;
  let fixture: ComponentFixture<TrainingsListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingsListItemComponent]
    });
    fixture = TestBed.createComponent(TrainingsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
