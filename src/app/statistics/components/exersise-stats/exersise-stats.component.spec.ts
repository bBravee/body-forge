import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExersiseStatsComponent } from './exersise-stats.component';

describe('ExersiseStatsComponent', () => {
  let component: ExersiseStatsComponent;
  let fixture: ComponentFixture<ExersiseStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExersiseStatsComponent]
    });
    fixture = TestBed.createComponent(ExersiseStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
