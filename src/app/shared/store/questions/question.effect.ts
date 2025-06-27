import { inject, Injectable } from "@angular/core";
import * as QuestionActions from "./question.action";
import * as QuestionSelectors from "./question.selector";
import * as examSelectors from "../exams/exam.selector";
import { Store } from '@ngrx/store';
import { QuestionService } from "../../../core/servies/question/question.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, interval, map, switchMap, takeUntil, tap, withLatestFrom } from "rxjs";
import * as ExamActions from "../exams/exam.action";
@Injectable()
export class QuestionsEffects {
private readonly actions = inject(Actions);
private readonly store = inject(Store);
private readonly questionService = inject(QuestionService);



readonly loadQuestionEffect = createEffect(() => {

  return this.actions.pipe(
    ofType(QuestionActions.loadQuestions),
    switchMap((action) => {
      return this.questionService.getAllQuestionOnExam(action.examId).pipe(
        tap((data) => console.log("Data from API:", data)),
        map((data) => QuestionActions.loadQuestionsSuccess({ questions: data.questions }))
      );
    })
  );
});

readonly loadQuestionsSeuccessEffect = createEffect(() => {
  return this.actions.pipe(
    ofType(QuestionActions.loadQuestionsSuccess),
    tap((action) => {
      console.log("Questions loaded successfully:", action.questions);
    }),
    map(()=>{
      return ExamActions.updateExamStatus({
        examStatus:"started"});
    })
  )
})

  readonly setCurrentQuestionEffect = createEffect(() =>
    this.actions.pipe(
      ofType(QuestionActions.loadQuestionsSuccess),
      withLatestFrom(this.store.select(QuestionSelectors.selectAllQuestions)),
     map(([action, questionList]) =>
      QuestionActions.currentQuestion({ question: questionList[0] })
    )
    )
  );

readonly examResultEffect = createEffect(() => {
  return this.actions.pipe(
    ofType(QuestionActions.showResult),
   map(()=>{
      return ExamActions.updateExamStatus({
        examStatus:"completed"});
    })
  );
})




timerEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExamActions.startTimer),
      switchMap(({ duration }) =>
        interval(1000).pipe(
          withLatestFrom(this.store.select(examSelectors.selectExamStatusValue)),
          filter(([_, status]) => status === 'started'),
          map(() => ExamActions.tickTimer()),
          takeUntil(
            this.actions.pipe(
              ofType(ExamActions.timeEnd, ExamActions.resetExamStatus)
            )
          )
        )
      )
    )
  );

  tickEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExamActions.tickTimer),
      withLatestFrom(this.store.select(examSelectors.examTimerSelector)),
      filter(([, timer]) => timer === 0),
      map(() => ExamActions.timeEnd())
    )
  );

}
