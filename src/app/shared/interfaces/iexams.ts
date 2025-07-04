
export interface ExamsAdaptResponse {
  message: string;
  exams: Exam[];
}
export interface iexams {
  message:  string;
  metadata: Metadata;
  exams:    Exam[];
}

export interface Exam {
  _id:               string;
  title:             string;
  duration:          number;
  subject:           string;
  numberOfQuestions: number;
  active:            boolean;
  createdAt:         Date;
}

export interface Metadata {
  currentPage:   number;
  numberOfPages: number;
  limit:         number;
}
