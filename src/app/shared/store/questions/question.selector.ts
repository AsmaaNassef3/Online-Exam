
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionState } from "./question.state";
import { selectExamStatus } from './../exams/exam.selector';
import e from "express";



export const selectQuestions = createFeatureSelector<QuestionState>("question");

export const selectAllQuestions = createSelector(
  selectQuestions,
  (state) => state.questions
);


export const selectCurrentQuestion = createSelector(
  selectQuestions,
  (state) => state.currentQuestion
);


  export const selectNumOfQuestions = createSelector(
    selectQuestions,
    (state) => state.numberOfQuestions)

  export const selectNumOfWrongQuestions = createSelector(
    selectQuestions,
    (state) => state.numberOfWrongQuestions
  )
  export const selectWrongQuestions = createSelector(
    selectQuestions,
    (state) => state.wrongQuestions   )
