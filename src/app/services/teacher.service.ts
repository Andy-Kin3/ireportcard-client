import {Inject, Injectable} from '@angular/core';
import {RC_TEACHER_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Teacher} from "../models/dto/teacher.model";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/dto/api.response";
import {NO_ENTITY_ID} from "../models/base/base.model";
import {TeacherServiceStrategyParams} from "./strategy/service.strategy.params";
import {TeacherServiceStrategy} from "./strategy/service.strategy";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    @Inject(RC_TEACHER_API_URL) private apiUrl: string,
    private http: HttpClient
  ) {
  }

  create = (teacher: Teacher): Observable<ApiResponse> => this.http.post<ApiResponse>(this.apiUrl, teacher);
  getAll = (): Observable<Teacher[]> => this.http.get<Teacher[]>(this.apiUrl);
  getAllBySchool = (schoolId: number): Observable<Teacher[]> => {
    return this.http.get<Teacher[]>(`${this.apiUrl}/school/${schoolId}`);
  }
  getAllBySchoolManager = (schoolManagerId: number): Observable<Teacher[]> => {
    return this.http.get<Teacher[]>(`${this.apiUrl}/school-manager/${schoolManagerId}`);
  }
  getById = (id: number): Observable<Teacher> => this.http.get<Teacher>(`${this.apiUrl}/${id}`);

  loadTeachers(teachers: Teacher[], strategy: TeacherServiceStrategy, params: TeacherServiceStrategyParams): void {
    switch (strategy) {
      case TeacherServiceStrategy.BY_ID: {
        this.getById(params.id ?? NO_ENTITY_ID).subscribe((res) => {
          teachers = [res];
        });
        break;
      }
      case TeacherServiceStrategy.BY_SCHOOL: {
        this.getAllBySchool(params.schoolId ?? NO_ENTITY_ID).subscribe((res) => {
          teachers = res;
        });
        break;
      }
      case TeacherServiceStrategy.BY_SCHOOL_MANAGER: {
        this.getAllBySchoolManager(params.schoolManagerId ?? NO_ENTITY_ID).subscribe((res) => {
          teachers = res
        });
        break;
      }
    }
  }
}
