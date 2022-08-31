import {Inject, Injectable} from '@angular/core';
import {School} from "../models/dto/school.model";
import {HttpClient} from "@angular/common/http";
import {RC_SCHOOL_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/dto/api.response";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, @Inject(RC_SCHOOL_API_URL) private apiUrl: string) {
  }

  getAll(): Observable<School[]> {
    return this.http.get<School[]>(this.apiUrl)
  }

  getById(id: number): Observable<School> {
    return this.http.get<School>(`${this.apiUrl}/${id}`)
  }

  save(school: School): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, school)
  }

  update(school: School): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, school)
  }

  deleteSchool(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`)
  }

  getAllByOwner(ownerId: number): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/owner/${ownerId}`)
  }
}
