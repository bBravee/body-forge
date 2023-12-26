import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsListComponent } from './trainings-list.component';

describe('TrainingsListComponent', () => {
  let component: TrainingsListComponent;
  let fixture: ComponentFixture<TrainingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingsListComponent]
    });
    fixture = TestBed.createComponent(TrainingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
