import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { iexams } from '../../../shared/interfaces/iexams';


@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor( private httpClient: HttpClient) { }


getAllExamsOnSubject(subjectId: string): Observable<iexams> {
  return this.httpClient.get<iexams>(`${environment.baseUrl}api/v1/exams?subject=${subjectId}`)}
}
