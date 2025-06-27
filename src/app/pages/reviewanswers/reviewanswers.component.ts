import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionAdapt } from '../../shared/interfaces/questions';
import { Observable } from 'rxjs';
import * as QuestionSelectors from '../../shared/store/questions/question.selector';
import * as QuestionActions from '../../shared/store/questions/question.action';
import * as ExamActions from '../../shared/store/exams/exam.action';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-reviewanswers',
  imports: [AsyncPipe],
  templateUrl: './reviewanswers.component.html',
  styleUrl: './reviewanswers.component.scss'
})
export class ReviewanswersComponent implements OnInit {
private readonly store = inject(Store);
wrongQuestions!:Observable<QuestionAdapt[]>

getAllWrongQuestions() {

 this.wrongQuestions = this.store.select( QuestionSelectors.selectWrongQuestions);


}

closeModal(){

  this.store.dispatch(QuestionActions.resetQuestionState());
  this.store.dispatch(ExamActions.resetExamStatus());
}

ngOnInit(): void {
this.getAllWrongQuestions()
}





}
