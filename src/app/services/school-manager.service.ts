import {Inject, Injectable} from '@angular/core';
import {RC_SCHOOL_MANAGER_API_URL, RC_SETTINGS_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {SchoolManagerSetup} from "../models/dto/school-manager.model";
import {ApiResponse} from "../models/dto/api.response";

@Injectable({
  providedIn: 'root'
})
export class SchoolManagerService {

  constructor(@Inject(RC_SCHOOL_MANAGER_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  setup = (setupRequest: SchoolManagerSetup) => this.http.post<ApiResponse>(`${this.apiUrl}/setup`, setupRequest)
}
