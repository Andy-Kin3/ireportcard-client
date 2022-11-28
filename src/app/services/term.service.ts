import {Inject, Injectable} from '@angular/core';
import {RC_TERM_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Term} from "../models/dto/term.model";
import {ApiResponse} from "../models/dto/api.response";

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(@Inject(RC_TERM_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getAllBySchoolId(schoolId: number): Observable<Term[]> {
    return this.http.get<Term[]>(`${this.apiUrl}/school/${schoolId}`);
  }

  save(term: Term): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, term);
  }

  update(term: Term): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, term);
  }
}
