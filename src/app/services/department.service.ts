import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Section} from "../models/dto/section.model";
import {HttpClient} from "@angular/common/http";
import {RC_DEPARTMENT_API_URl} from "../app.constants";
import {Department} from "../models/dto/department.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient, @Inject(RC_DEPARTMENT_API_URl) private apiUrl: string) {
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Section>(`${this.apiUrl}/${id}`);
  }

  getAllBySchoolId(schoolId: number): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/school/${schoolId}`);
  }

  save(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  update(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}`, department);
  }
}
