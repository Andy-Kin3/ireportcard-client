import {Inject, Injectable} from '@angular/core';
import {School} from "../models/dto/school.model";
import {HttpClient} from "@angular/common/http";
import {RC_SCHOOL_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/dto/api.response";
import {LocalStorageUtil} from "../utils/local-storage.util";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, @Inject(RC_SCHOOL_API_URL) private apiUrl: string) {
  }

  getAllBySchoolManagerId(schoolManagerId: number): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/school-manager/${schoolManagerId}`)
  }

  getAllBySchoolManagerSmId(schoolManagerSmId: string): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/school-manager/sm/${schoolManagerSmId}`)
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

  loadSchoolIdLocalStorage(): Observable<number> {
    return new Observable<number>((subscriber) => {
      let i = 0;
      const interval = setInterval(() => {
        let schoolId = LocalStorageUtil.readSchoolId();
        if (schoolId || i >= 100) {
          clearInterval(interval);
          if (schoolId) {
            subscriber.next(schoolId);
            subscriber.complete();
          }
        }
        i++;
      }, 250);
    });
  }

  getsAll(): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/school-manager/sm/`)
  }
}
