import { createReducer, on } from "@ngrx/store";
import { ExamState, ExamStatus } from "./exam.state";
import * as ExamActions from './exam.action'

export const ExaminitialState: ExamState = {
  examStatus: 'notStarted',
  isExamModalOpen: false,

  timer: null,
  duration: null,
}

export const examReducer = createReducer(
  ExaminitialState,on(
    ExamActions.toggleModal,
    (state) => ({
      ...state,
      isExamModalOpen: !state.isExamModalOpen
    })
    )
  ,on(ExamActions.updateExamStatus, (state, { examStatus }) => ({
    ...state,
    examStatus: examStatus
  })),
  on(ExamActions.resetExamStatus, () => ExaminitialState),on(ExamActions.startTimer, (state, { duration }) => ({
    ...state,
    duration,
    timer: duration
  })),
  on(ExamActions.tickTimer, (state) => ({
    ...state,
    timer: state.timer !== null ? state.timer - 1 : null
  })),
  on(ExamActions.timeEnd, (state) => ({
    ...state,
    examStatus: 'Time End' as ExamStatus
  }))
)
