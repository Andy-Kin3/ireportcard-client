import {Inject, Injectable} from '@angular/core';
import {RC_PAYMENT_SETTING_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {PaymentSetting} from "../models/dto/payment-setting.model";
import {ApiResponse} from "../models/dto/api.response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentSettingService {

  constructor(
    @Inject(RC_PAYMENT_SETTING_API_URL) private apiUrl: string,
    private http: HttpClient,
  ) {
  }

  save = (paymentSetting: PaymentSetting): Observable<ApiResponse> => {
    return this.http.post<ApiResponse>(this.apiUrl, paymentSetting);
  }

  update = (paymentSetting: PaymentSetting): Observable<ApiResponse> => {
    return this.http.put<ApiResponse>(this.apiUrl, paymentSetting);
  }

  getBySchoolId = (schoolId: number): Observable<PaymentSetting> => {
    return this.http.get<PaymentSetting>(`${this.apiUrl}/school/${schoolId}`);
  }
}
