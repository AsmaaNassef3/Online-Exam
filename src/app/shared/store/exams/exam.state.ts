export type ExamStatus = 'notStarted' | 'started' | 'completed' |'reviewAnswers'|'closed'| 'Time End';

export interface ExamState{
  examStatus: ExamStatus;
  isExamModalOpen: boolean;
   timer: number | null; // seconds left
  duration: number | null; // total seconds
}

