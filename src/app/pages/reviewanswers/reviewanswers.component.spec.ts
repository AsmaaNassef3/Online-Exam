import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewanswersComponent } from './reviewanswers.component';

describe('ReviewanswersComponent', () => {
  let component: ReviewanswersComponent;
  let fixture: ComponentFixture<ReviewanswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewanswersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewanswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
