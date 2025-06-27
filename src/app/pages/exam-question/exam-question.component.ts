import {
  Component,
  inject,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuestionSelectors from '../../shared/store/questions/question.selector';
import * as QuestionActions from '../../shared/store/questions/question.action';
import { QuestionAdapt } from '../../shared/interfaces/questions';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import * as examSelectors from '../../shared/store/exams/exam.selector';
@Component({
  selector: 'app-exam-question',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './exam-question.component.html',
  styleUrl: './exam-question.component.scss',
})
export class ExamQuestionComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _fb = inject(FormBuilder);

  public numOfQuestions$!: Observable<number>;
  public numOfQuestions!: number;
  public currentQuestionObj$!: Observable<QuestionAdapt | null>;
  public currentQuestionObj!: QuestionAdapt | null;
  public quizForm!: FormGroup;
timer$!: Observable<number | null>;
  isBackBtnDisabled: WritableSignal<boolean> = signal(true);
  isNextBtnDisabled: WritableSignal<boolean> = signal(true);

  enableNextBtn() {
    this.isNextBtnDisabled.set(false);
  }
  disableNextBtn() {
    this.isNextBtnDisabled.set(true);
  }
  enableBackBtn() {
    this.isBackBtnDisabled.set(false);
  }
  disableBackBtn() {
    this.isBackBtnDisabled.set(true);
  }
trakTimer(){
  this.timer$ = this._store.select(examSelectors.examTimerSelector);

}
  trackNumOfQuestions() {
    this.numOfQuestions$ = this._store.select(
      QuestionSelectors.selectNumOfQuestions
    );
  }

  trackNumOfQuestionsWithoutAsyncPipe() {
    this._store.select(QuestionSelectors.selectNumOfQuestions).subscribe({
      next: (data) => (this.numOfQuestions = data),
    });
  }

  trackCurrentQuestion() {
    this.currentQuestionObj$ = this._store.select(
      QuestionSelectors.selectCurrentQuestion
    );
  }

  trackCurrentQuestionWithoutAsyncPipe() {
    this._store.select(QuestionSelectors.selectCurrentQuestion).subscribe({
      next: (data) => (this.currentQuestionObj = data),
    });
  }

  generateRange(num: number) {
    return num ? [...Array(num).keys()] : [];
  }

  initForm() {
    this.quizForm = this._fb.group({
      selectedAnswer: [null],
    });
  }

  onSelectAnswer() {
    this.enableNextBtn();
  }

  // onNext() {
  //   const selectedAnswer = this.quizForm.get('selectedAnswer')?.value;

  //   this._store.dispatch(
  //     QuestionActions.updateQuestionAnswer({
  //       questionId: this.currentQuestionObj?._id!,
  //       selectedAnswer,
  //     })
  //   );

  //   this._store.dispatch(
  //     QuestionActions.onNext({
  //       currentQuestionIndex: this.currentQuestionObj?.index!,
  //     })
  //   );

  //   this.disableNextBtn();
  //   this.enableBackBtn();

  //   if (this.currentQuestionObj?.selectedAnswer) {
  //     this.enableNextBtn();
  //     this.quizForm
  //       .get('selectedAnswer')
  //       ?.setValue(this.currentQuestionObj.selectedAnswer);
  //   } else {
  //     this.disableNextBtn();
  //     this.quizForm.get('selectedAnswer')?.setValue(null);
  //   }

  //   if (this.currentQuestionObj?.index === this.numOfQuestions - 1) {
  //     console.log('completed');
  //     this.showReport();
  //     return;
  //   }
  // }
onNext() {
  const selectedAnswer = this.quizForm.get('selectedAnswer')?.value;

  this._store.dispatch(
    QuestionActions.updateQuestionAnswer({
      questionId: this.currentQuestionObj?._id!,
      selectedAnswer,
    })
  );

  this._store.dispatch(
    QuestionActions.onNext({
      currentQuestionIndex: this.currentQuestionObj?.index!,
    })
  );

  this.disableNextBtn();

  if (this.currentQuestionObj?.selectedAnswer) {
    this.enableNextBtn();
    this.quizForm
      .get('selectedAnswer')
      ?.setValue(this.currentQuestionObj.selectedAnswer);
  } else {
    this.disableNextBtn();
    this.quizForm.get('selectedAnswer')?.setValue(null);
  }

  if (this.currentQuestionObj?.index === this.numOfQuestions - 1) {
    console.log('completed');
    this.showReport();
    return;
  }

  if ((this.currentQuestionObj?.index ?? 0) === 0) {
    this.disableBackBtn();
  } else {
    this.enableBackBtn();
  }
}

  // onBack() {
  //   if (this.currentQuestionObj?.index === 0) {
  //     this.disableBackBtn();
  //   }
  //   this.enableNextBtn();

  //   this._store.dispatch(
  //     QuestionActions.onBack({
  //       currentQuestionIndex: this.currentQuestionObj?.index!,
  //     })
  //   );
  //   this.quizForm.get('selectedAnswer')?.setValue(
  //     this.currentQuestionObj?.selectedAnswer
  //   );
  // }
  onBack() {

  if ((this.currentQuestionObj?.index ?? 0) <= 1) {
    this.disableBackBtn();
  } else {
    this.enableBackBtn();
  }
  this.enableNextBtn();
  this._store.dispatch(
    QuestionActions.onBack({
      currentQuestionIndex: this.currentQuestionObj?.index!,
    })
  );

  this.quizForm.get('selectedAnswer')?.setValue(
    this.currentQuestionObj?.selectedAnswer
  );
}


  showReport() {
  this._store.dispatch(QuestionActions.showResult());
  }
  ngOnInit(): void {
    this.trackNumOfQuestions();
    this.trackCurrentQuestion();
    this.trackNumOfQuestionsWithoutAsyncPipe();
    this.trackCurrentQuestionWithoutAsyncPipe();
    this.initForm();
    this.trakTimer();
  }
}

