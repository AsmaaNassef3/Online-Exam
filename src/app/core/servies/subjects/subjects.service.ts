import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AllSubjectRes } from '../../../shared/interfaces/all-subject-res';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private httpClient:HttpClient) { }


getAllSubjects():Observable<AllSubjectRes>{
  return this.httpClient.get<AllSubjectRes>(`${environment.baseUrl}api/v1/subjects`)
}


getAllLimitedSubjects():Observable<AllSubjectRes>{
  return this.httpClient.get<AllSubjectRes>(`${environment.baseUrl}api/v1/subjects?limit=6`)
}}
