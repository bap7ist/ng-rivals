import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnkindComponent } from './unkind.component';

describe('UnkindComponent', () => {
  let component: UnkindComponent;
  let fixture: ComponentFixture<UnkindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnkindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnkindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
