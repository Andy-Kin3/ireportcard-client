import {Inject, Injectable} from '@angular/core';
import {RC_AUTH_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  UserModel,
  UserAuth,
  UserChangePassword,
  UserLoginRequest,
  UserRegisterRequest,
  UserRegisterResponse
} from "../models/dto/user.model";
import {Student} from "../models/dto/student.model";
import {ApiResponse} from "../models/dto/api.response";
import {Teacher} from "../models/dto/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(RC_AUTH_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  login = (userLogin: UserLoginRequest): Observable<UserAuth> => {
    return this.http.post<UserAuth>(`${this.apiUrl}/login`, userLogin);
  }

  register = (userReg: UserRegisterRequest): Observable<UserRegisterResponse> => {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/register`, userReg);
  }

  registerAdmin = (admin: UserModel, password: string): Observable<UserRegisterResponse> => {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/register/admin`, admin, {
      params: {password: password}
    });
  }

  registerStudent = (student: Student, password: string): Observable<UserRegisterResponse> => {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/register/student`, student, {
      params: {password: password}
    });
  }

  registerTeacher = (teacher: Teacher, password: string): Observable<UserRegisterResponse> => {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/register/teacher`, teacher, {
      params: {password: password}
    });
  }

  logout = (logout: { sessionId: string }): Observable<UserAuth> => {
    return this.http.post<UserAuth>(`${this.apiUrl}/logout`, logout);
  }

  changePassword = (creds: UserChangePassword): Observable<ApiResponse> => {
    return this.http.put<ApiResponse>(`${this.apiUrl}/change-password`, creds);
  }
}
