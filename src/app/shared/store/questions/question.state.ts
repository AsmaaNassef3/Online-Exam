import { QuestionAdapt } from "../../interfaces/questions";



export interface QuestionState {
  questions: QuestionAdapt[]; // List all question that related to the EXAM ID
  currentQuestion: QuestionAdapt | null; // To Display the Current Question
  wrongQuestions: QuestionAdapt[]; // To list all wrong answered questions
  numberOfQuestions: number; // Number of all questions
  numberOfWrongQuestions: number; 
}



