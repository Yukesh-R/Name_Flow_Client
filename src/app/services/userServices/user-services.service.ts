import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { RegistrationRequestModel } from '../../models/registration-request.model';
import { AuthenticationRequestModel } from '../../models/authentication-request.model';
import { VerifyResetPasswordModel } from '../../models/verify-resetpassword.model';
import { AuthenticationResponseModel } from '../../models/authentication-response.model';
import { UpdateUserModel } from '../../models/update-user-model.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = environment.baseURL;

  public registrationEmailValidation(email: string): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      `${this.baseUrl}/registration/email-validation/${email}`,
    );
  }

  public verifyActivationCode(
    registrationRequest: RegistrationRequestModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/registration/verification`,
      registrationRequest,
    );
  }

  public authenticate(
    authRequest: AuthenticationRequestModel,
  ): Observable<AuthenticationResponseModel> {
    return this.httpClient.post<AuthenticationResponseModel>(
      `${this.baseUrl}/authentication`,
      authRequest,
    );
  }

  public forgetPasswordMailSend(email: string): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      `${this.baseUrl}/forget-password/${email}`,
    );
  }

  public verifyAndResetPassword(
    verifyResetPassword: VerifyResetPasswordModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/reset-password`,
      verifyResetPassword,
    );
  }

  public updateUser(
    updateUserModel: UpdateUserModel,
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseUrl}/update-user`,
      updateUserModel,
    );
  }

  public deleteUser(userId: number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      `${this.baseUrl}/delete-user/` + userId,
    );
  }
}
