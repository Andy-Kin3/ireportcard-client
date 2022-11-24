import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_SUBJECT_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Subject} from "../models/dto/subject.model";
import {ApiResponse} from "../models/dto/api.response";
import {NO_ENTITY_ID} from "../models/base/base.model";
import {SubjectServiceStrategyParams} from "./strategy/service.strategy.params";
import {SubjectServiceStrategy} from "./strategy/service.strategy";
import {AcademicYear} from "../models/dto/academic-year.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, @Inject(RC_SUBJECT_API_URL) private apiUrl: string) {
  }

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl);
  }

  getAllBySchoolId(schoolId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/school/${schoolId}`);
  }

  getAllByDepartmentId(departmentId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/department/${departmentId}`);
  }

  getById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/${id}`);
  }

  save(subject: Subject): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, subject);
  }

  update(subject: Subject): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.apiUrl, subject);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.subjectApiUrl}/${id}`);
  }
}
