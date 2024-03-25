import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUserPanelComponent } from './stats-user-panel.component';

describe('StatsUserPanelComponent', () => {
  let component: StatsUserPanelComponent;
  let fixture: ComponentFixture<StatsUserPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsUserPanelComponent]
    });
    fixture = TestBed.createComponent(StatsUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
