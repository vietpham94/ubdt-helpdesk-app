import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

import {ApiService} from '../core-api/api.service';

import {Constants} from '../../common/constants';
import {LoginParams} from '../../interfaces/login-params';
import {LoginResponse} from '../../interfaces/login-response';
import {AuthInfo} from '../../interfaces/auth-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) {
  }

  public isAuthenticated(): boolean {
    const authData = localStorage.getItem(Constants.authKey);
    if (!authData) {
      return false;
    }
    return true;
  }

  public login(loginParam: LoginParams) {
    if (!loginParam) {
      return;
    }

    return this.apiService.post(Constants.apiRestEndPoints.login, loginParam, {headers: this.getNoAuthHeader()}, 'Login');
  }

  public getNoAuthHeader(): HttpHeaders {
    return new HttpHeaders(
      {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    );
  }

  public getAuthHeader(): HttpHeaders {
    return new HttpHeaders(
      {
        'Accept': '*/*',
        'Authorization': 'Bearer ' + this.getAuthInfo().token
      }
    );
  }

  public getAuthInfo(): AuthInfo {
    let userInfo: LoginResponse | any = localStorage.getItem(Constants.authKey);
    if (!userInfo) {
      return;
    }

    try {
      userInfo = JSON.parse(userInfo);
      const authInfo: AuthInfo = {
        name: userInfo.wp_user.data.display_name,
        username: userInfo.wp_user.data.user_email,
        token: userInfo.access_token,
        refreshToken: userInfo.refresh_token
      };
      return authInfo;
    } catch (e) {
      console.error(e.message);
    }

    return;
  }

  public setAuthInfo(dataInfo: LoginResponse): boolean {
    if (!dataInfo) {
      return;
    }

    if (localStorage.getItem(Constants.authKey)) {
      localStorage.removeItem(Constants.authKey);
    }

    try {
      localStorage.setItem(Constants.authKey, JSON.stringify(dataInfo));
      return true;
    } catch (e) {
      console.error(e.message);
    }

    return;
  }
}
