import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversComponent } from './univers.component';

describe('UniversComponent', () => {
  let component: UniversComponent;
  let fixture: ComponentFixture<UniversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
