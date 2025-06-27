import { createReducer, on, State } from "@ngrx/store";
import { QuestionState } from "./question.state";
import * as QuestionActions from "./question.action";

export const enitialQuestionState:QuestionState = {

  questions: [],
  currentQuestion: null,
  wrongQuestions: [],
  numberOfQuestions: 0,
  numberOfWrongQuestions: 0,
}

export const loadQuestionReducer = createReducer(
  enitialQuestionState,
  on(QuestionActions.loadQuestions,()=>enitialQuestionState),



   on(QuestionActions.loadQuestionsSuccess, (state, { questions }) => ({
    ...state,
    questions: questions,
    numberOfQuestions: questions.length,
  }))
  ,on(QuestionActions.currentQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  }))
 , on(
    QuestionActions.updateQuestionAnswer,
    (state, { questionId, selectedAnswer }) => ({
      ...state,
      questions: state.questions.map((q) =>
        q._id === questionId ? { ...q, selectedAnswer } : q
      ),
    })
  ),on(QuestionActions.onNext, (state, { currentQuestionIndex }) => ({
    ...state,
    currentQuestion: state.questions[currentQuestionIndex + 1],
  })),
  on(QuestionActions.onBack, (state, { currentQuestionIndex }) => ({
    ...state,
    currentQuestion: state.questions[currentQuestionIndex - 1],
  })),on(QuestionActions.showResult, (state) => ({
    ...state,
    wrongQuestions: state.questions.filter(
      (q) => q.selectedAnswer !== q.correct
    ),
    numberOfWrongQuestions: state.questions.filter(
      (q) => q.selectedAnswer !== q.correct
    ).length,
  })),on(QuestionActions.resetQuestionState, () => enitialQuestionState)

)
