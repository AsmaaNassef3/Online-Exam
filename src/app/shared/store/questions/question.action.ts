import { createAction, props } from '@ngrx/store';
import { QuestionAdapt } from '../../interfaces/questions';

export const loadQuestions = createAction(
  '[Question] Load Questions',
  props<{ examId: string }>()
);

export const loadQuestionsSuccess = createAction(
  '[Question] Load Questions Success',
  props<{ questions: QuestionAdapt[] }>()
);

export const currentQuestion = createAction(
  '[Question] Current Question',
  props<{ question: QuestionAdapt }>()
);
export const updateQuestionAnswer = createAction(
  '[Question] Update Question Answer',
  props<{ questionId: string; selectedAnswer: string }>()
);
export const onNext = createAction(
  '[Question] On Next',
  props<{ currentQuestionIndex: number }>()
);
export const onBack = createAction(
  '[Question] On Back',
  props<{ currentQuestionIndex: number }>()
);
export const showResult = createAction(
  '[Question] Show Result',
);
export const resetQuestionState = createAction(
  '[Question] Reset Question State'
);
