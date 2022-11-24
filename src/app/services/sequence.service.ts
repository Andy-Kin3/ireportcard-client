import {Inject, Injectable} from '@angular/core';
import {RC_SEQUENCE_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sequence} from "../models/dto/sequence.model";
import {ApiResponse} from "../models/dto/api.response";

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  constructor(@Inject(RC_SEQUENCE_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getAllBySchoolId(schoolId: number): Observable<Sequence[]> {
    return this.http.get<Sequence[]>(`${this.apiUrl}/school/${schoolId}`);
  }

  getByTermId(termId: number): Observable<Sequence[]> {
    return this.http.get<Sequence[]>(`${this.apiUrl}/term/${termId}`);
  }

  save(sequence: Sequence): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, sequence);
  }

  update(sequence: Sequence): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${sequence.id}`, sequence);
  }
}
