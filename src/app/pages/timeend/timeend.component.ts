import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExamActions from '../../shared/store/exams/exam.action';
@Component({
  selector: 'app-timeend',
  imports: [],
  templateUrl: './timeend.component.html',
  styleUrl: './timeend.component.scss'
})
export class TimeendComponent {


  private readonly _store = inject(Store);
  showReview() {
    this._store.dispatch(ExamActions.updateExamStatus({ examStatus: 'reviewAnswers' }));
  }

}
