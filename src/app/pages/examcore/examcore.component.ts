import { Component, inject, signal } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import * as QuestionSelectors from '../../shared/store/questions/question.selector';
import * as QuestionActions from '../../shared/store/questions/question.action';
import * as ExamActions from '../../shared/store/exams/exam.action';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-exam-score',
  imports: [NgChartsModule, TranslateModule],
  templateUrl:'./examcore.component.html',
  styleUrl: './examcore.component.scss',
})
export class ExamScoreComponent {
  doughnutChartLabels: string[] = [] as string[];
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartType: ChartType = 'doughnut';
  numOfWrong = signal(0);
  numOfQuestions = signal(0);
  timer!: NodeJS.Timeout;
  private readonly _store = inject(Store);

  getWrongQuestionsNum() {
    this._store
      .select(QuestionSelectors.selectNumOfWrongQuestions)
      .subscribe({
        next: (value) => {
          this.numOfWrong.set(value);
        },
      });
  }

  getQuestionsNum() {
    this._store
      .select(QuestionSelectors.selectNumOfQuestions)
      .subscribe({
        next: (value) => {
          this.numOfQuestions.set(value);
        },
      });
  }

  initChart() {
    this.doughnutChartLabels = ['Wrong', 'Correct'];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [this.numOfWrong(), this.numOfQuestions() - this.numOfWrong()],
          backgroundColor: ['#e2162f', '#1688e2'],
        },
      ],
    };
  }

  closeModal() {
    // Clear Exam State
    this._store.dispatch(ExamActions.resetExamStatus());
    //Clear Question State
    this._store.dispatch(QuestionActions.resetQuestionState());
  }
  showFullSummary(){

    this._store.dispatch(ExamActions.updateExamStatus({ examStatus: 'reviewAnswers' }));
  }

  getScorePercent(): number {
    const total = this.numOfQuestions();
    const wrong = this.numOfWrong();
    if (total === 0) return 0;
    return Math.round(((total - wrong) / total) * 100);
  }

  ngAfterViewInit(): void {
    this.timer = setTimeout(() => {
      this.getQuestionsNum();
      this.getWrongQuestionsNum();
      this.initChart();
    }, 10);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
