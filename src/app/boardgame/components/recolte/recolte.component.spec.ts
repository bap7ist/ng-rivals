import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecolteComponent } from './recolte.component';

describe('RecolteComponent', () => {
  let component: RecolteComponent;
  let fixture: ComponentFixture<RecolteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecolteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecolteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
