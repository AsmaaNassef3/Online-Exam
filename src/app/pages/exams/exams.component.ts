import {
  Component,inject,OnInit,signal, WritableSignal,
} from '@angular/core';
import { ExamsService } from '../../core/servies/exams/exams.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Exam } from '../../shared/interfaces/iexams';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { Store } from '@ngrx/store';
import * as ExamActions from '../../shared/store/exams/exam.action';
import * as ExamSelectors from '../../shared/store/exams/exam.selector';
import * as QuestionActions from '../../shared/store/questions/question.action';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ExamState, ExamStatus } from '../../shared/store/exams/exam.state';
import { ExamQuestionComponent } from '../exam-question/exam-question.component';
import { ExamScoreComponent } from "../examcore/examcore.component";
import { ReviewanswersComponent } from "../reviewanswers/reviewanswers.component";
import { TimeendComponent } from "../timeend/timeend.component";

import { TranslationService } from '../../core/servies/translate/translation.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-exams',
  imports: [RouterOutlet,RouterLink, ModalComponent, AsyncPipe, ExamQuestionComponent, ExamScoreComponent, ReviewanswersComponent, TimeendComponent, TranslateModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',})
export class ExamsComponent implements OnInit {
  allExamsList: WritableSignal<Exam[]> = signal([]);
  private readonly examsService = inject(ExamsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store);
  readonly translate = inject(TranslationService);

  isOpen!: Observable<boolean>;
  status!:Observable<ExamStatus>
  eventChange() {
    this.isOpen = this.store.select(ExamSelectors.selectExamModal);
    this.status = this.store.select(ExamSelectors.selectExamStatusValue);
  }

loadQuestions(ExamId: string) {
  this.store.dispatch(QuestionActions.loadQuestions({
      examId:ExamId
    }))
}


  startExam() {
    this.store.dispatch(ExamActions.toggleModal());
    this.store.dispatch(ExamActions.startTimer({ duration: this.allExamsList()[0].duration * 60 })); // duration in seconds

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));

        this.examsService.getAllExamsOnSubject(p.get('id')!).subscribe({
          next: (res) => {
            console.log('exams', res), this.allExamsList.set(res.exams);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
    this.eventChange();
  }
}
