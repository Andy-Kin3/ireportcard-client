import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AcademicYear} from "../models/dto/academic-year.model";
import {RC_ACADEMIC_YEAR_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../models/dto/api.response";
import {AcademicYearServiceStrategyParams, TeacherServiceStrategyParams} from "./strategy/service.strategy.params";
import {AcademicYearServiceStrategy, TeacherServiceStrategy} from "./strategy/service.strategy";
import {Teacher} from "../models/dto/teacher.model";
import {NO_ENTITY_ID} from "../models/base/base.model";

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  constructor(@Inject(RC_ACADEMIC_YEAR_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getAll(): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(this.apiUrl);
  }

  getAllBySchool(schoolId: number): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(`${this.apiUrl}/school/${schoolId}`);
  }

  save(academicYear: AcademicYear): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, academicYear);
  }

  update(academicYear: AcademicYear): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, academicYear);
  }

  getById(id: number): Observable<AcademicYear> {
    return this.http.get<AcademicYear>(`${this.apiUrl}/${id}`);
  }

  loadAcademicYears(
    academicYears: AcademicYear[],
    strategy: AcademicYearServiceStrategy,
    params: AcademicYearServiceStrategyParams,
    actions?: Function[]
  ) {
    switch (strategy) {
      case AcademicYearServiceStrategy.BY_ID: {
        this.getById(params.id ?? NO_ENTITY_ID).subscribe((res) => {
          academicYears = [res];
          this.runLoadActions(academicYears, actions, res);
        });
        break;
      }
      case AcademicYearServiceStrategy.BY_SCHOOL: {
        this.getAllBySchool(params.schoolId ?? NO_ENTITY_ID).subscribe((res) => {
          academicYears = res;
          this.runLoadActions(academicYears, actions, res);
        });
        break;
      }
      case AcademicYearServiceStrategy.BY_SCHOOL_MANAGER: {
        break;
      }
    }
  }

  private runLoadActions(academicYears: AcademicYear[], actions?: Function[], res?: AcademicYear | AcademicYear[]) {
    actions?.forEach((action) => action(academicYears, res));
  }
}
