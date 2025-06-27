import { createAction, props } from "@ngrx/store";
import { ExamStatus } from "./exam.state";


 export const toggleModal = createAction('[EXAM] toggleModal');

export const updateExamStatus = createAction(
  '[EXAM] Update Exam Status',props<{ examStatus:ExamStatus }>())

  export const startTimer = createAction('[Exam] Start Timer', props<{ duration: number }>());
export const tickTimer = createAction('[Exam] Tick Timer');
export const timeEnd = createAction('[Exam] Time End');


  export const resetExamStatus = createAction(
  '[EXAM] Reset Exam Status')
