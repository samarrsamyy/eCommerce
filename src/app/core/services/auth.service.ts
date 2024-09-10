import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: Token | null;

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router =inject(Router)

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);

      // console.log(this.userData);
    }
  }

  logOut(): void {
    if(typeof localStorage != 'undefined'){
      localStorage.removeItem('userToken');
      this.userData = null;
      // call Api to remove Token depends on documentation
      this._Router.navigate(['/login']);
    }
   
  }

  // Forgot Password 

  setEmailVerify(email:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }

  setCodeVerify(code:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }

  setResetPass(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }


}
