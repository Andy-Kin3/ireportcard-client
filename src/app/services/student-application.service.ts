import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  ApplicationRequest,
  ApplicationResponse,
  StudentApplication,
  StudentApplicationKey, StudentApplicationTrial
} from "../models/dto/student-application.model";
import {RC_STUDENT_APPLICATION_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {

  constructor(@Inject(RC_STUDENT_APPLICATION_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  get(applicationKey: StudentApplicationKey): Observable<StudentApplication> {
    return this.http.get<StudentApplication>(`${this.apiUrl}/key`, {
      params: {classSubId: applicationKey.classSubId, studentId: applicationKey.studentId}
    });
  }

  getFull(applicationKey: StudentApplicationKey, yearId: number): Observable<ApplicationResponse> {
    return this.http.get<ApplicationResponse>(`${this.apiUrl}/one_full`, {
      params: {yearId: yearId, classId: applicationKey.classSubId, studentId: applicationKey.studentId}
    })
  }

  getAll(): Observable<StudentApplication[]> {
    return this.http.get<StudentApplication[]>(`${this.apiUrl}/all`);
  }

  getAllByRequest(request: ApplicationRequest): Observable<ApplicationResponse[]> {
    return this.http.get<ApplicationResponse[]>(`${this.apiUrl}/all_full`, {
      params: {yearId: request.yearId, classId: request.classSubId}
    });
  }

  save(application: ApplicationRequest): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, application);
  }

  update(application: ApplicationRequest): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}`, application);
  }

  delete(applicationKey: StudentApplicationKey): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`, {
      params: {studentId: applicationKey.studentId, classSubId: applicationKey.classSubId,}
    })
  }

  // TRIAL
  getTrialByClassAndYear(classId: number, yearId: number): Observable<StudentApplicationTrial[]> {
    return this.http.get<StudentApplicationTrial[]>(`${this.apiUrl}/sat`, {
      params: {yearId: yearId, classSubId: classId}
    });
  }

  getTrial(satId: number): Observable<StudentApplicationTrial> {
    return this.http.get<StudentApplicationTrial>(`${this.apiUrl}/sat/${satId}`);
  }

  deleteTrial(satId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sat/${satId}`);
  }
}
