import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_STUDENT_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Student} from "../models/dto/student.model";
import {ApiResponse} from "../models/dto/api.response";
import {NO_ENTITY_ID} from "../models/base/base.model";
import {StudentServiceStrategy} from "./strategy/service.strategy";
import {StudentServiceStrategyParams} from "./strategy/service.strategy.params";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, @Inject(RC_STUDENT_API_URL) private apiUrl: string) {
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getAllBySchoolId(schoolId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/school/${schoolId}`);
  }

  getAllBySchoolManagerId(schoolManagerId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/school/${schoolManagerId}`);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  save(student: Student): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, student);
  }

  update(student: Student): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, student);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
