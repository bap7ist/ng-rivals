import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTimelineComponent } from './side-timeline.component';

describe('TimelineComponent', () => {
  let component: SideTimelineComponent;
  let fixture: ComponentFixture<SideTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
