import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { MainAPIAdapter } from '../../adapter/main-api-adapter.service';
import { QuestionsAdaptResponse, QuestionsResponse } from '../../../shared/interfaces/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly _mainAPIAdapter = inject(MainAPIAdapter);
  constructor( private httpClient: HttpClient) {}


getAllQuestionOnExam(examId: string): Observable<QuestionsAdaptResponse> {
  return this.httpClient.get<QuestionsResponse>(`${environment.baseUrl}api/v1/questions?exam=${examId}`).pipe(
    map((res: QuestionsResponse) => {
      return this._mainAPIAdapter.questionAdapter(res);
    })
  );
}


}

