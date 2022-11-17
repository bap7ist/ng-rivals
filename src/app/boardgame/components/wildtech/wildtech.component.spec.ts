import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildtechComponent } from './wildtech.component';

describe('WildtechComponent', () => {
  let component: WildtechComponent;
  let fixture: ComponentFixture<WildtechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildtechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WildtechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
