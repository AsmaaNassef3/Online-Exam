import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExamState, ExamStatus } from "./exam.state";


 export const selectExamStatus = createFeatureSelector<ExamState>('exam')

 export const selectExamModal = createSelector(
   selectExamStatus,
   (state) => state.isExamModalOpen
 )

export const selectExamStatusValue = createSelector(
  selectExamStatus,
  (state) => state.examStatus)
  export const examTimerSelector = createSelector(selectExamStatus, (state) => state.timer);
export const examDurationSelector = createSelector(selectExamStatus, (state) => state.duration);




