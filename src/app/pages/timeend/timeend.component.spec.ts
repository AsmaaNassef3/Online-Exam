import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeendComponent } from './timeend.component';

describe('TimeendComponent', () => {
  let component: TimeendComponent;
  let fixture: ComponentFixture<TimeendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
