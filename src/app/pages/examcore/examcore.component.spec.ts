import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcoreComponent } from './examcore.component';

describe('ExamcoreComponent', () => {
  let component: ExamcoreComponent;
  let fixture: ComponentFixture<ExamcoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamcoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
