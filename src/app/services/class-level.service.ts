import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_CLASS_LEVEL_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {ClassLevel} from "../models/dto/class-level.model";
import {ApiResponse} from "../models/dto/api.response";
import {Subject} from "../models/dto/subject.model";

@Injectable({
  providedIn: 'root'
})
export class ClassLevelService {

  constructor(private http: HttpClient, @Inject(RC_CLASS_LEVEL_API_URL) private classLevelApiUrl: string) {
  }

  getAll(): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(this.classLevelApiUrl);
  }

  getBySection(sectionId: number): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(`${this.classLevelApiUrl}/section/${sectionId}`);
  }

  getBySchool(schoolId: number): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(`${this.classLevelApiUrl}/school/${schoolId}`);
  }

  getById(id: number): Observable<ClassLevel> {
    return this.http.get<ClassLevel>(`${this.classLevelApiUrl}/${id}`);
  }

  save(classLevel: ClassLevel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.classLevelApiUrl}`, classLevel);
  }

  update(classLevel: ClassLevel): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.classLevelApiUrl}`, classLevel);
  }

  delete(classLevel: ClassLevel): Observable<any> {
    return this.http.delete<any>(`${this.classLevelApiUrl}/${classLevel.id}`);
  }

  // Mandatory subjects
  getSubjects = (id: number): Observable<Subject[]> => {
    return this.http.get<Subject[]>(`${this.classLevelApiUrl}/${id}/subjects`)
  }
  updateSubject = (id: number, subjectId: number): Observable<ApiResponse> => {
    return this.http.put<ApiResponse>(`${this.classLevelApiUrl}/${id}/subjects/${subjectId}`, {})
  }
  updateSubjects = (id: number, subjectIds: number[]): Observable<ApiResponse> => {
    return this.http.put<ApiResponse>(`${this.classLevelApiUrl}/${id}/subjects`, subjectIds)
  }
}
